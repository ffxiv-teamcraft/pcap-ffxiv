import { EventEmitter } from "events";
import { ConstantsList, OpcodeList, Region, Segment, SegmentHeader, SegmentType } from "./models";
import { downloadJson } from "./json-downloader";
import { loadPacketProcessors } from "./packet-processors/load-packet-processors";
import { BufferReader } from "./BufferReader";
import { createServer as createHttpServer, Server } from "http";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { join } from "path";
import { Options } from "./options";
import { existsSync } from "fs";

export class CaptureInterface extends EventEmitter {
	private _opcodeLists: OpcodeList[] | undefined;
	private _constants: Record<keyof Region, ConstantsList> | undefined;
	private _packetDefs: Record<string, (reader: BufferReader, constants: ConstantsList) => any>;
	private _opcodes: { C: Record<number, string>, S: Record<number, string> } = {
		C: {},
		S: {},
	};

	private _httpServer: Server | undefined = undefined;
	private _monitor: ChildProcessWithoutNullStreams | undefined;

	private readonly _options: Options;

	public get constants(): ConstantsList | undefined {
		return this._constants ? this._constants[this._options.region] : undefined;
	}

	constructor(options: Partial<Options>) {
		super();

		const defaultOptions: Options = {
			region: "Global",
			exePath: join(__dirname, "./MachinaWrapper/MachinaWrapper.exe"),
			monitorType: "WinPCap",
			port: 13346,
			filter: () => true,
			logger: payload => console[payload.type](payload.message),
			winePrefix: "$HOME/.Wine",
			hasWine: false,
		};

		this._options = {
			...defaultOptions,
			...options,
		};

		if (!existsSync(this._options.exePath)) {
			throw new Error(`MachinaWrapper not found in ${this._options.exePath}`);
		}

		this._packetDefs = loadPacketProcessors();

		this._loadOpcodes().then(async () => {
			await this._loadConstants();
			this.emit("ready");
		});
	}

	start(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.spawnMachina();
				this._httpServer = createHttpServer((req, res) => {
					let data: any[] = [];
					req.on("data", (chunk) => {
						data.push(chunk);
					});
					req.on("end", () => {
						this._processSegment(Buffer.concat(data));
					});
					res.writeHead(200);
					res.end();
				}).listen(this._options.port, "localhost");
				setTimeout(() => {
					this._monitor?.stdin.write("start\n", (err) => {
						if (err) {
							reject(err);
						} else {
							resolve();
						}
					});
				}, 200);
			} catch (e) {
				reject(e);
			}
		});
	}

	private spawnMachina(): void {
		const args: string[] = [
			"--MonitorType", this._options.monitorType,
			"--Region", this._options.region,
			"--Port", this._options.port.toString(),
		];
		if (this._options.pid) args.push("--ProcessID", this._options.pid.toString());

		if (this._options.hasWine) {
			this._monitor = spawn(`WINEPREFIX="${this._options.winePrefix}" wine ${this._options.exePath}`, args);
		} else {
			this._monitor = spawn(this._options.exePath, args);
		}

		this._options.logger({
			type: "info",
			message: `MachinaWrapper started with args: ${args.join(" ")}`,
		});
	}

	stop(): Promise<void> {
		return new Promise((resolve, reject) => {
			this._monitor?.stdin.write("kill", (writeErr) => {
				this._httpServer?.close((err) => {
					delete this._httpServer;
					if (err || writeErr) {
						reject(err || writeErr);
					} else {
						resolve();
					}
				});
			});
		});
	}

	setRegion(region: Region) {
		this._options.region = region;
		this.updateOpcodesCache();
	}

	private static opcodesToRegistry(opcodes: { name: string, opcode: number }[]): Record<number, string> {
		return opcodes.reduce(
			(acc, entry) => {
				return {
					...acc,
					[entry.opcode]: entry.name,
				};
			},
			{},
		) as Record<number, string>;
	}

	updateOpcodesCache(): void {
		const regionOpcodes = this._opcodeLists?.find((ol) => ol.region === this._options.region);
		this._opcodes = {
			C: CaptureInterface.opcodesToRegistry(regionOpcodes?.lists.ClientZoneIpcType || []),
			S: CaptureInterface.opcodesToRegistry(regionOpcodes?.lists.ServerZoneIpcType || []),
		};
	}

	private async _loadOpcodes() {
		this._opcodeLists = await downloadJson(
			"https://cdn.jsdelivr.net/gh/karashiiro/FFXIVOpcodes@latest/opcodes.min.json",
		);
		this.updateOpcodesCache();
	}

	private async _loadConstants() {
		this._constants = await downloadJson(
			"https://cdn.jsdelivr.net/gh/karashiiro/FFXIVOpcodes@latest/constants.min.json",
		);
	}

	private _processSegment(data: Buffer): void {
		const dataReader = new BufferReader(data);
		const originIndex = dataReader.nextUInt8();
		const origin = [null, "C", "S"][originIndex];
		if (!origin) {
			this._options.logger({
				type: "error",
				message: `Received a packet with origin ${originIndex}, should be 1 or 2.`,
			});
			return;
		}
		const reader = dataReader.restAsBuffer(true);
		const header: SegmentHeader = {
			size: reader.nextUInt32(),
			sourceActor: reader.nextUInt32(),
			targetActor: reader.nextUInt32(),
			segmentType: reader.nextUInt32(),
		};
		if (header.segmentType === SegmentType.Ipc) {
			const opcode = reader.skip(2).nextUInt16();
			const ipcData = reader.skip(12).restAsBuffer();
			const segment: Segment<any> = {
				header: header,
				ipcData: ipcData,
			};

			let typeName = this._opcodes[origin][opcode] || "unknown";
			typeName = typeName[0].toLowerCase() + typeName.slice(1);

			if (this._options.filter(header, typeName)) {
				// Unmarshal the data, if possible.
				if (this._packetDefs[typeName] && this._constants) {
					const ipcDataReader = new BufferReader(ipcData);
					segment.parsedIpcData = this._packetDefs[typeName](ipcDataReader, this._constants[this._options.region]);
				}

				this.emit("message", typeName, segment);
			}
		}
	}
}

interface CaptureInterfaceEvents {
	ready: () => void;
	error: (err: Error) => void;
	message: (type: string, message: Segment<any>) => void;
}

export declare interface CaptureInterface {
	on<U extends keyof CaptureInterfaceEvents>(event: U, listener: CaptureInterfaceEvents[U]): this;

	emit<U extends keyof CaptureInterfaceEvents>(event: U, ...args: Parameters<CaptureInterfaceEvents[U]>): boolean;
}
