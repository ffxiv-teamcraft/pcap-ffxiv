import { Cap, decoders } from "cap";
import { EventEmitter } from "events";
import {
	isMagical,
	parseFrameHeader,
	parseIpcHeader,
	parseSegmentHeader,
} from "./frame-processing";
import { Packet, Segment, SegmentType } from "./models";
import { IpcHeader } from "./models/IpcHeader";
import pako from "pako";

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

	constructor() {
		super();
		this._cap = new Cap();
		this._buf = Buffer.alloc(65535);
	}

	open(deviceIdentifier: string) {
		const device = Cap.findDevice(deviceIdentifier);
		this._cap.open(device, FILTER, 10 * MEGABYTE, this._buf);
		this._cap.setMinBytes && this._cap.setMinBytes(0);
		this._registerInternalHandlers();
	}

	private _registerInternalHandlers() {
		this._cap.on("packet", (nBytes: number) => {
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

							ipcData = Buffer.alloc(segmentHeader.size - SEG_HEADER_SIZE - IPC_HEADER_SIZE);
							ipcPayload.copy(ipcData, 0, IPC_HEADER_SIZE);
						}

						const segment = {
							header: segmentHeader,
							ipcHeader,
							ipcData,
						};

						packet.childFrame.segments.push();
						this.emit("message", "unknown", segment);

						offset += segmentHeader.size;
					}

					this.emit("packet", packet);
				}
			}
		});
	}
}

interface CaptureInterfaceEvents {
	packet: (packet: Packet) => void;
	message: (type: string, message: Segment) => void;
}

export declare interface CaptureInterface {
	on<U extends keyof CaptureInterfaceEvents>(event: U, listener: CaptureInterfaceEvents[U]): this;
	emit<U extends keyof CaptureInterfaceEvents>(
		event: U,
		...args: Parameters<CaptureInterfaceEvents[U]>
	): boolean;
}
