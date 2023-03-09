import { EventEmitter } from "events";
import {
	ActorControlType,
	ConstantsList,
	DeucalionPacket,
	Message,
	OpcodeList,
	PacketProcessor,
	Region,
	ResultDialogType,
	SuperPacket,
	SuperPacketProcessor,
} from "./models";
import { downloadJson } from "./json-downloader";
import { packetProcessors } from "./packet-processors/packet-processors";
import { BufferReader } from "./BufferReader";
import { join } from "path";
import { existsSync, readFileSync } from "fs";
import { actorControlPacketProcessors } from "./packet-processors/actor-control-packet-processors";
import { resultDialogPacketProcessors } from "./packet-processors/result-dialog-packet-processors";
import { CaptureInterfaceOptions } from "./capture-interface-options";
import { Deucalion } from "./Deucalion";
import { exec } from "child_process";

export class CaptureInterface extends EventEmitter {
	private _opcodeLists: OpcodeList[] | undefined;
	private _constants: Record<keyof Region, ConstantsList> | undefined;
	private readonly _packetDefs: Record<string, PacketProcessor>;
	private readonly _superPacketDefs: Record<keyof typeof packetProcessors, Record<string, SuperPacketProcessor<any>>>;
	private _opcodes: { C: Record<number, string>; S: Record<number, string> } = {
		C: {},
		S: {},
	};

	readonly _options: CaptureInterfaceOptions;

	private _deucalion?: Deucalion;

	public get constants(): ConstantsList | undefined {
		return this._constants ? this._constants[this._options.region] : undefined;
	}

	constructor(options: Partial<CaptureInterfaceOptions>) {
		super();

		const defaultOptions: CaptureInterfaceOptions = {
			region: "Global",
			deucalionExePath: join(__dirname, "./deucalion/deucalion.exe"),
			port: 13346,
			filter: () => true,
			logger: (payload) => console[payload.type](payload.message),
			winePrefix: "$HOME/.Wine",
			hasWine: false,
		};

		this._options = {
			...defaultOptions,
			...options,
		};

		this._options.logger({
			type: "info",
			message: JSON.stringify(this._options),
		});

		if (!existsSync(this._options.deucalionExePath)) {
			throw new Error(`Deucalion.exe not found in ${this._options.deucalionExePath}`);
		}

		this._packetDefs = packetProcessors;
		this._superPacketDefs = {
			actorControl: actorControlPacketProcessors,
			actorControlSelf: actorControlPacketProcessors,
			actorControlTarget: actorControlPacketProcessors,
			resultDialog: resultDialogPacketProcessors,
		};

		this._loadOpcodes().then(async () => {
			await this._loadConstants();
			this.emit("ready");
		});

		process.on("exit", () => {
			this.stop();
		});
	}

	start(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this.constants) {
				reject("Trying to start capture before ready event was emitted");
			}
			const callback = (err, stdout, stderr) => {
				if (err) {
					this._options.logger({
						type: "error",
						message: err.message,
					});
					reject(stderr || err);
					return;
				}
				const [_, pid] = stdout.split(" ");
				this._deucalion = new Deucalion(this.constants?.RECV || "", this.constants?.SEND || "", this._options.logger, +pid);
				this._deucalion.start();
				this._deucalion.on("packet", p => this._processSegment(p));
				this._deucalion.on("closed", () => this.emit("stopped"));
				this._deucalion.on("error", err => this.emit("error", err));
			};
			const hash = readFileSync(join(__dirname, "dll.sum"));
			if (this._options.hasWine) {
				exec(`WINEPREFIX="${this._options.winePrefix}" wine ${this._options.deucalionExePath} ${hash}`, callback);
			} else {
				exec(`${this._options.deucalionExePath} ${hash}`, callback);
			}
		});
	}

	stop() {
		return this._deucalion?.stop(true);
	}

	setRegion(region: Region) {
		this._options.region = region;
		this.updateOpcodesCache();
	}

	private static opcodesToRegistry(opcodes: { name: string; opcode: number }[]): Record<number, string> {
		return opcodes.reduce((acc, entry) => {
			return {
				...acc,
				[entry.opcode]: entry.name,
			};
		}, {}) as Record<number, string>;
	}

	updateOpcodesCache(): void {
		const regionOpcodes = this._opcodeLists?.find((ol) => ol.region === this._options.region);
		this._opcodes = {
			C: CaptureInterface.opcodesToRegistry(regionOpcodes?.lists.ClientZoneIpcType || []),
			S: CaptureInterface.opcodesToRegistry(regionOpcodes?.lists.ServerZoneIpcType || []),
		};
	}

	private async _fetchFFXIVOpcodes(file: string) {
		const { localDataPath } = this._options;
		const localPath = localDataPath;
		if (localPath) {
			try {
				const content = readFileSync(join(localPath, file), "utf-8");
				this._options.logger({
					type: "info",
					message: `Loading ${file} from ${localPath}`,
				});
				return JSON.parse(content);
			} catch (e) {
			}
		}

		this._options.logger({
			type: "info",
			message: `Loading ${file} from ${this._options.region === "CN" ? "ffcafe" : "github"}`,
		});

		const baseUrl =
			this._options.region === "CN"
				? "https://opcodes.xivcdn.com/"
				: "https://raw.githubusercontent.com/karashiiro/FFXIVOpcodes/master/";

		return downloadJson(`${baseUrl}${file}`);
	}

	private async _loadOpcodes() {
		this._opcodeLists = await this._fetchFFXIVOpcodes("opcodes.min.json");
		this.updateOpcodesCache();
	}

	private async _loadConstants() {
		this._constants = await this._fetchFFXIVOpcodes("constants.min.json");
	}

	private _processSuperPacket<T extends SuperPacket>(
		typeName: string,
		message: Message,
		reader: BufferReader,
	): Message {
		let subTypesEnum: Record<string | number, string | number>;
		// Let's get the corresponding enum
		switch (typeName) {
			case "actorControl":
			case "actorControlSelf":
			case "actorControlTarget":
				subTypesEnum = ActorControlType;
				break;
			case "resultDialog":
				subTypesEnum = ResultDialogType;
				break;
			default:
				this._options.logger({
					type: "error",
					message: `Got super packet of type ${typeName} with super processors but no type enum.`,
				});
				return message;
		}

		let subTypeName = subTypesEnum[(message.parsedIpcData as SuperPacket).category] as string;
		if (!subTypeName) {
			message.subType = `unknown${(message.parsedIpcData as SuperPacket).category}`;
			// Unknown subtype, return packet as-is
			return message;
		}

		subTypeName = subTypeName[0].toLowerCase() + subTypeName.slice(1);
		message.subType = subTypeName;
		const superProcessor = this._superPacketDefs[typeName][subTypeName];
		if (!superProcessor) {
			// No processor for this sub packet, return packet as-is
			return message;
		}

		message.parsedIpcData = superProcessor(
			message.parsedIpcData,
			reader,
			this.constants as ConstantsList,
			this._options.region,
		);
		return message;
	}

	private _processSegment(packet: DeucalionPacket): void {
		const ipcData = packet.data;
		const opcode = packet.header.type;
		let typeName = this._opcodes[packet.origin][opcode] || "unknown";
		typeName = typeName[0].toLowerCase() + typeName.slice(1);

		let message: Message = {
			header: packet.header,
			opcode: packet.header.type,
			type: typeName as any,
			data: Buffer.from(packet.data),
		};

		if (this._options.filter(packet.header, typeName)) {
			// Unmarshal the data, if possible.
			if (this._packetDefs[typeName] && this._constants) {
				const processorName: keyof typeof packetProcessors = typeName;
				const ipcDataReader = new BufferReader(ipcData);
				const processor = this._packetDefs[processorName];
				message.parsedIpcData = processor(ipcDataReader, this._constants[this._options.region], this._options.region);

				// If this is a super packet
				if (this._superPacketDefs[typeName]) {
					message = this._processSuperPacket(typeName, message, ipcDataReader.reset());
				}
			}

			this.emit("message", message);
		}
	}
}

export interface CaptureInterfaceEvents {
	ready: () => void;
	stopped: () => void;
	error: (err: Error) => void;
	message: (message: Message) => void;
}

export declare interface CaptureInterface {
	on<U extends keyof CaptureInterfaceEvents>(event: U, listener: CaptureInterfaceEvents[U]): this;

	emit<U extends keyof CaptureInterfaceEvents>(event: U, ...args: Parameters<CaptureInterfaceEvents[U]>): boolean;
}
