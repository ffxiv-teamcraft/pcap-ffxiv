import { EventEmitter } from "events";
import {
	ActorControlType,
	ConstantsList,
	DesynthResultType,
	DeucalionPacket,
	ErrorCodes,
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
import { desynthResultPacketProcessors } from "./packet-processors/desynth-result-packet-processors";
import { resultDialogPacketProcessors } from "./packet-processors/result-dialog-packet-processors";
import { CaptureInterfaceOptions } from "./capture-interface-options";
import { Deucalion } from "./Deucalion";
import { getPIDByName, injectPID } from "@ffxiv-teamcraft/dll-inject";
import crypto from "crypto";
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
			deucalionDllPath: join(__dirname, "./deucalion/deucalion.dll"),
			filter: () => true,
			logger: (payload) => console[payload.type](payload.message),
		};

		this._options = {
			...defaultOptions,
			...options,
		};

		this._options.logger({
			type: "info",
			message: JSON.stringify(this._options),
		});

		if (!existsSync(this._options.deucalionDllPath)) {
			throw new Error(`Deucalion.dll not found in ${this._options.deucalionDllPath}`);
		}

		this._packetDefs = packetProcessors;
		this._superPacketDefs = {
			actorControl: actorControlPacketProcessors,
			actorControlSelf: actorControlPacketProcessors,
			actorControlTarget: actorControlPacketProcessors,
			desynthResult: desynthResultPacketProcessors,
			resultDialog: resultDialogPacketProcessors,
		};

		this._loadOpcodes().then(async () => {
			await this._loadConstants();
			this.emit("ready");
		});

		[
			"beforeExit",
			"SIGHUP",
			"SIGINT",
			"SIGQUIT",
			"SIGILL",
			"SIGTRAP",
			"SIGABRT",
			"SIGBUS",
			"SIGFPE",
			"SIGUSR1",
			"SIGSEGV",
			"SIGUSR2",
			"SIGTERM",
		].forEach((sig) => {
			process.on(sig, (args) => {
				this.stop().then(() => {
					this._options.logger({
						type: "error",
						message: args,
					});
					process.exit(0);
				});
			});
		});
	}

	getXIVPIFFromTasklist(): Promise<{ name: string; pid: number } | null> {
		return new Promise<{ name: string; pid: number } | null>((resolve, reject) => {
			exec("tasklist", (err, stdout) => {
				if (err) {
					reject(err);
				}
				resolve(
					stdout
						.split("\n")
						.map((line) => {
							const match = /(ffxiv_dx11.exe)\s+(\d+)/gm.exec(line);
							if (match) {
								return {
									name: match[1],
									pid: +match[2],
								};
							}
						})
						.find(Boolean) || null,
				);
			});
		});
	}

	getXIVPID(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			const fromInjector = getPIDByName("ffxiv_dx11.exe");
			if (fromInjector > 0) {
				return resolve(fromInjector);
			} else {
				this._options.logger({
					type: "info",
					message: "Process not found, falling back to tasklist",
				});
				this.getXIVPIFFromTasklist()
					.then((fromTaskList) => {
						if (fromTaskList) {
							this._options.logger({
								type: "info",
								message: "Found XIV process in tasklist",
							});
							return resolve(fromTaskList.pid);
						} else {
							return reject(ErrorCodes.GAME_NOT_RUNNING);
						}
					})
					.catch((err) => {
						this._options.logger({
							type: "error",
							message: err,
						});
					});
			}
		});
	}

	start(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			if (!this.constants) {
				reject("Trying to start capture before ready event was emitted");
			}
			this.getXIVPID()
				.then((pid) => {
					const buff = readFileSync(this._options.deucalionDllPath);
					const expectedHash = readFileSync(join(__dirname, "dll.sum"), "utf-8");
					const hash = crypto.createHash("sha256").update(buff).digest("hex");
					console.log(this._options.deucalionDllPath);
					if (hash !== expectedHash) {
						this._options.logger({
							type: "error",
							message: `Deucalion Hash missmatch`,
						});
						reject(`Hash missmatch`);
						return;
					}
					const res = injectPID(pid, this._options.deucalionDllPath);
					this._options.logger({
						type: "info",
						message: `Deucalion-inj res: [${res}] ${res > 0 ? ErrorCodes[res] : ""}`,
					});
					if (res === 0) {
						this._deucalion = new Deucalion(
							this.constants?.RECV || "",
							this.constants?.SEND || "",
							this._options.logger,
							pid,
							this._options.name,
						);
						this._deucalion
							.start()
							.then(() => {
								this._deucalion!.on("packet", (p) => this._processSegment(p));
								this._deucalion!.on("closed", () => this.emit("stopped"));
								this._deucalion!.on("error", (err) => this.emit("error", err));
								resolve();
							})
							.catch((err) => reject(err));
					} else {
						reject(res);
					}
				})
				.catch((err) => {
					if (err) {
						this._options.logger({
							type: "error",
							message: ErrorCodes[err] || err,
						});
					}
					reject(ErrorCodes.GAME_NOT_RUNNING);
				});
		});
	}

	stop() {
		if (!this._deucalion) {
			this.emit("stopped");
			return Promise.resolve();
		}
		return this._deucalion.stop();
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

		const fallbackUrl =
			this._options.region === "CN"
				? "https://raw.githubusercontent.com/karashiiro/FFXIVOpcodes/master/"
				: "https://opcodes.xivcdn.com/";

		return downloadJson(`${baseUrl}${file}`).catch(async () => {
			return await downloadJson(`${fallbackUrl}${file}`);
		});
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
			case "desynthResult":
				subTypesEnum = DesynthResultType;
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
			origin: packet.origin,
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
