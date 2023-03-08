import { EventEmitter } from "events";
import {
	ActorControlType,
	ConstantsList,
	Message,
	OpcodeList,
	PacketProcessor,
	Region,
	ResultDialogType,
	SegmentHeader,
	SegmentType,
	SuperPacket,
	SuperPacketProcessor,
} from "./models";
import { downloadJson } from "./json-downloader";
import { packetProcessors } from "./packet-processors/packet-processors";
import { BufferReader } from "./BufferReader";
import { Server } from "http";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { join } from "path";
import { readFileSync } from "fs";
import { actorControlPacketProcessors } from "./packet-processors/actor-control-packet-processors";
import { resultDialogPacketProcessors } from "./packet-processors/result-dialog-packet-processors";
import { CaptureInterfaceOptions } from "./capture-interface-options";
import Heap from "heap-js";
import { Deucalion } from "./Deucalion";

interface SegmentQueueEntry {
	reader: BufferReader;
	index: bigint;
}

export class CaptureInterface extends EventEmitter {
	private _opcodeLists: OpcodeList[] | undefined;
	private _constants: Record<keyof Region, ConstantsList> | undefined;
	private readonly _packetDefs: Record<string, PacketProcessor>;
	private readonly _superPacketDefs: Record<keyof typeof packetProcessors, Record<string, SuperPacketProcessor<any>>>;
	private _opcodes: { C: Record<number, string>; S: Record<number, string> } = {
		C: {},
		S: {},
	};
	private _segmentQueue = new Heap<SegmentQueueEntry>((a, b) => Number(a.index - b.index));

	private _httpServer: Server | undefined = undefined;
	private _monitor: ChildProcessWithoutNullStreams | undefined;

	readonly _options: CaptureInterfaceOptions;

	private expectedPacketIndex = BigInt(0);

	private skippedPackets = 0;

	public get constants(): ConstantsList | undefined {
		return this._constants ? this._constants[this._options.region] : undefined;
	}

	constructor(options: Partial<CaptureInterfaceOptions>) {
		super();

		const defaultOptions: CaptureInterfaceOptions = {
			region: "Global",
			exePath: join(__dirname, "./MachinaWrapper/MachinaWrapper.exe"),
			monitorType: "WinPCap",
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

		// if (!existsSync(this._options.exePath)) {
		// 	throw new Error(`MachinaWrapper not found in ${this._options.exePath}`);
		// }

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
			this.stop().then(() => {
				process.exit();
			});
		});
	}

	async start() {
		const deucalion = new Deucalion();
		deucalion.start();

		// new Promise((resolve, reject) => {
		// 	try {
		// 		// this._httpServer = createHttpServer((req, res) => {
		// 		// 	let data: any[] = [];
		// 		// 	req.on("data", (chunk) => {
		// 		// 		data.push(chunk);
		// 		// 	});
		// 		// 	req.on("end", () => {
		// 		// 		const segmentBuffer = Buffer.concat(data);
		// 		// 		const segmentReader = new BufferReader(segmentBuffer);
		// 		// 		const index = segmentReader.skip(1).nextUInt64();
		// 		// 		this._segmentQueue.push({
		// 		// 			index,
		// 		// 			reader: segmentReader.reset(),
		// 		// 		});
		// 		// 		this._processNextSegment();
		// 		// 		res.writeHead(200);
		// 		// 		res.end();
		// 		// 	});
		// 		// }).listen(this._options.port, "localhost");
		// 		// setTimeout(() => {
		// 		// 	this._monitor?.stdin.write("start\n", (err) => {
		// 		// 		if (err) {
		// 		// 			reject(err);
		// 		// 		} else {
		// 		// 			resolve();
		// 		// 		}
		// 		// 	});
		// 		// }, 200);
		// 	} catch (e) {
		// 		reject(e);
		// 	}
		// });
	}

	private _processNextSegment() {
		const peek = this._segmentQueue.peek();
		if (peek && peek.index <= this.expectedPacketIndex) {
			const next = this._segmentQueue.pop();
			// This is really just for the compiler because if we're here, there's something to pop.
			if (next) {
				this._processSegment(next.reader);
				this.expectedPacketIndex++;
				this.skippedPackets = 0;
				this._processNextSegment();
			}
		} else {
			this.skippedPackets++;
		}
		// If we skipped more than 200 packets, something isn't right, let's just bump to the next available index
		if (this.skippedPackets > 200 && peek) {
			this._options.logger({
				type: "warn",
				message: `Waited for packet #${this.expectedPacketIndex} for too long, bumping to ${peek.index}.`,
			});
			this.expectedPacketIndex = peek.index;
			this.skippedPackets = 0;
		}
	}

	private _spawnMachina(): void {
		const args: string[] = [
			"--MonitorType",
			this._options.monitorType,
			"--Region",
			this._options.region,
			"--Port",
			this._options.port.toString(),
		];
		if (this._options.pid) args.push("--ProcessID", this._options.pid.toString());

		if (this._options.hasWine) {
			this._monitor = spawn(`WINEPREFIX="${this._options.winePrefix}" wine ${this._options.exePath}`, args);
		} else {
			this._monitor = spawn(this._options.exePath, args);
		}

		this._monitor?.stderr.on("data", (err: Buffer) => {
			this._options.logger({
				type: "error",
				message: `MachinaWrapper failed to start: 
				${err.toLocaleString()}`,
			});
			this.emit("error", new Error(`MachinaWrapper failed to start: ${err.toString("utf8")}`));
		});

		this._monitor.on("exit", () => {
			this.closeHttpServer();
		});

		this._options.logger({
			type: "info",
			message: `MachinaWrapper started with args: ${args.join(" ")}`,
		});
	}

	stop(): Promise<void> {
		return new Promise(() => {
			this._monitor?.stdin.write("kill\n", () => {
				return this.closeHttpServer();
			});
		});
	}

	private closeHttpServer(): Promise<void> {
		return new Promise((resolve, reject) => {
			this._httpServer?.close((err) => {
				delete this._httpServer;
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
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
			} catch (e) {}
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

	private _getOriginKey(originIndex: number): null | "C" | "S" {
		return [null, "C", "S"][originIndex] as null | "C" | "S";
	}

	private _getOrigin(originKey: "C" | "S"): "send" | "receive" {
		return { C: "send", S: "receive" }[originKey] as "send" | "receive";
	}

	private _processSegment(dataReader: BufferReader): void {
		const originIndex = dataReader.nextUInt8();
		const origin = this._getOriginKey(originIndex);
		if (!origin) {
			this._options.logger({
				type: "error",
				message: `Received a packet with origin ${originIndex}, should be 1 or 2.`,
			});
			return;
		}
		const reader = dataReader.skip(8).restAsBuffer(true);
		const header: SegmentHeader = {
			size: reader.nextUInt32(),
			sourceActor: reader.nextUInt32(),
			targetActor: reader.nextUInt32(),
			segmentType: reader.nextUInt16(),
			padding: reader.nextUInt16(),
			operation: this._getOrigin(origin),
		};
		if (header.segmentType === SegmentType.Ipc) {
			const ipcHeader = {
				reserved: reader.nextInt16(),
				type: reader.nextInt16(),
				padding: reader.nextInt16(),
				serverId: reader.nextInt16(),
				timestamp: reader.nextUInt32(),
				padding1: reader.nextUInt32(),
			};
			// This is a chat packet !
			if (ipcHeader.serverId === 0 && header.sourceActor !== 0) {
				return;
			}
			const ipcData = reader.restAsBuffer();
			const opcode = ipcHeader.type;
			let typeName = this._opcodes[origin][opcode] || "unknown";
			typeName = typeName[0].toLowerCase() + typeName.slice(1);

			let message: Message = {
				header,
				opcode,
				type: typeName as any,
				data: Buffer.from(dataReader.buffer),
			};

			if (this._options.filter(header, typeName)) {
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
}

export interface CaptureInterfaceEvents {
	ready: () => void;
	error: (err: Error) => void;
	message: (message: Message) => void;
}

export declare interface CaptureInterface {
	on<U extends keyof CaptureInterfaceEvents>(event: U, listener: CaptureInterfaceEvents[U]): this;

	emit<U extends keyof CaptureInterfaceEvents>(event: U, ...args: Parameters<CaptureInterfaceEvents[U]>): boolean;
}
