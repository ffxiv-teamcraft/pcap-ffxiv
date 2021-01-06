import { Cap, decoders } from "cap";
import { EventEmitter } from "events";
import { isMagical, parseFrameHeader, parseIpcHeader, parseSegmentHeader } from "./frame-processing";
import { DiagnosticInfo, OpcodeList, Packet, Region, Segment, SegmentType } from "./models";
import { IpcHeader } from "./models/IpcHeader";
import pako from "pako";
import { downloadJson } from "./json-downloader";
import { loadPacketDefs } from "./load-packetdefs";
import { ConstantsList } from "./models/ConstantsList";
import { performance } from "perf_hooks";

const PROTOCOL = decoders.PROTOCOL;
const FILTER =
	"tcp portrange 54992-54994 or tcp portrange 55006-55007 or tcp portrange 55021-55040 or tcp portrange 55296-55551";

const BYTE = 1;
const KILOBYTE = 1024 * BYTE;
const MEGABYTE = 1024 * KILOBYTE;

const FRAME_HEADER_SIZE = 40;
const SEG_HEADER_SIZE = 16;
const IPC_HEADER_SIZE = 16;

export class CaptureInterface extends EventEmitter {
	private readonly _cap: Cap;
	private readonly _buf: Buffer;

	private _opcodeLists: OpcodeList[] | undefined;
	private _constants: { [key in Region]: ConstantsList } | undefined;
	private _packetDefs: { [key: string]: (buf: Buffer) => any };
	private _region: Region;
	private _opcodes: Record<number, string> = {};

	constructor(region: Region = "Global") {
		super();

		this._cap = new Cap();
		this._buf = Buffer.alloc(65535);
		this._region = region;
		this._packetDefs = loadPacketDefs();

		this._loadOpcodes().then(async () => {
			await this._loadConstants();
			this.emit("ready");
		});
	}

	setRegion(region: Region) {
		this._region = region;
		this.updateOpcodesCache();
	}

	updateOpcodesCache(): void {
		const regionOpcodes = this._opcodeLists?.find((ol) => ol.region === this._region);

		this._opcodes = regionOpcodes?.lists.ServerZoneIpcType.concat(regionOpcodes?.lists.ClientZoneIpcType).reduce(
			(acc, entry) => {
				return {
					...acc,
					[entry.opcode]: entry.name,
				};
			},
			{},
		) as Record<number, string>;
	}

	open(deviceIdentifier: string) {
		const device = Cap.findDevice(deviceIdentifier);
		this._cap.open(device, FILTER, 10 * MEGABYTE, this._buf);
		this._cap.setMinBytes && this._cap.setMinBytes(0);
		this._registerInternalHandlers();
	}

	close() {
		this._cap.close();
	}

	async _loadOpcodes() {
		this._opcodeLists = await downloadJson(
			"https://raw.githubusercontent.com/karashiiro/FFXIVOpcodes/master/opcodes.min.json",
		);
		this.updateOpcodesCache();
	}

	async _loadConstants() {
		this._constants = await downloadJson(
			"https://raw.githubusercontent.com/karashiiro/FFXIVOpcodes/master/constants.min.json",
		);
	}

	private _registerInternalHandlers() {
		this._cap.on("packet", (nBytes: number) => {
			const start = performance.now();

			// The total buffer is way bigger than the relevant data, so we trim that first.
			const payload = this._buf.slice(0, nBytes);

			let ret = decoders.Ethernet(payload);
			if (ret.info.type === PROTOCOL.ETHERNET.IPV4) {
				ret = decoders.IPV4(payload, ret.offset);

				// The info object is destroyed once we decode the TCP data from the packet payload.
				const srcAddr = ret.info.srcaddr;
				const dstAddr = ret.info.dstaddr;

				if (ret.info.protocol === PROTOCOL.IP.TCP) {
					let datalen = ret.info.totallen - ret.hdrlen;
					ret = decoders.TCP(payload, ret.offset);
					datalen -= ret.hdrlen;

					if ((ret.info.flags & 8) === 0) return; // Only TCP PSH has actual data.

					const childFramePayload = payload.slice(payload.length - datalen);

					const cfHeaderPayload = childFramePayload.slice(0, FRAME_HEADER_SIZE);
					const frameHeader = parseFrameHeader(cfHeaderPayload);

					if (!isMagical(frameHeader)) return;

					const packet: Packet = {
						source: {
							address: srcAddr,
							port: ret.info.srcport,
						},
						destination: {
							address: dstAddr,
							port: ret.info.dstport,
						},
						childFrame: {
							header: frameHeader,
							segments: [],
						},
					};

					// Decompress the segments, if necessary.
					let remainder = childFramePayload.slice(FRAME_HEADER_SIZE);
					if (frameHeader.isCompressed) {
						try {
							const decompressed = pako.inflate(remainder);
							remainder = Buffer.from(decompressed.buffer);
						} catch (err) {
							// This will happen if the packet contents are encrypted.
							if (err === "incorrect header check") {
								return;
							}
						}
					}

					let offset = 0;
					for (let i = 0; i < frameHeader.segmentCount; i++) {
						const segmentPayload = remainder.slice(offset);
						const segmentHeader = parseSegmentHeader(segmentPayload);

						let ipcHeader: IpcHeader | undefined;
						let ipcData: Buffer | undefined;
						if (segmentHeader.segmentType === SegmentType.Ipc) {
							const ipcPayload = remainder.slice(offset + SEG_HEADER_SIZE);
							ipcHeader = parseIpcHeader(ipcPayload);

							/* Copy the IPC data to a new Buffer, so that it's not removed from under us.
							 * All of the buffers we used previously can potentially be views of the packet
							 * buffer itself, which is subject to change after this callback.
							 *
							 * We can use allocUnsafe here because we're copying the existing data right
							 * over the uninitialized memory.
							 */
							ipcData = Buffer.allocUnsafe(segmentHeader.size - SEG_HEADER_SIZE - IPC_HEADER_SIZE);
							ipcPayload.copy(ipcData, 0, IPC_HEADER_SIZE);
						}

						const segment: Segment<any> = {
							header: segmentHeader,
							ipcHeader,
							ipcData,
						};
						packet.childFrame.segments.push(segment);

						// If the segment is an IPC segment, get the known name of the contained message and fire an event.
						if (ipcHeader != null) {
							let typeName = this._opcodes[ipcHeader?.type] || "unknown";
							typeName = typeName[0].toLowerCase() + typeName.slice(1);

							// Unmarshal the data, if possible.
							if (this._packetDefs[typeName]) {
								try {
									segment.parsedIpcData = this._packetDefs[typeName](ipcData!);
								} catch (err) {
									this.emit("error", err);
								}
							}

							this.emit("message", typeName, segment);
						}

						this.emit("segment", segment);

						offset += segmentHeader.size;
					}

					this.emit("packet", packet);

					const end = performance.now();
					this.emit("diagnostics", {
						lastProcessingTimeMs: end - start,
					});
				}
			}
		});
	}

	static getDevices(): {
		name: string;
		description?: string;
		addresses: { addr: string; netmask: string; broadaddr?: string }[];
		flags?: string;
	}[] {
		return Cap.deviceList();
	}
}

interface CaptureInterfaceEvents {
	ready: () => void;
	error: (err: Error) => void;
	packet: (packet: Packet) => void;
	segment: (segment: Segment<any>) => void;
	message: (type: string, message: Segment<any>) => void;
	diagnostics: (diagInfo: DiagnosticInfo) => void;
}

export declare interface CaptureInterface {
	on<U extends keyof CaptureInterfaceEvents>(event: U, listener: CaptureInterfaceEvents[U]): this;

	emit<U extends keyof CaptureInterfaceEvents>(event: U, ...args: Parameters<CaptureInterfaceEvents[U]>): boolean;
}
