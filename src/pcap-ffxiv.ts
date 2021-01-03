import { Cap, decoders } from "cap";
import { EventEmitter } from "events";

const PROTOCOL = decoders.PROTOCOL;
const FILTER =
	"tcp portrange 54992-54994 or tcp portrange 55006-55007 or tcp portrange 55021-55040 or tcp portrange 55296-55551";

const BYTE = 1;
const KILOBYTE = 1024 * BYTE;
const MEGABYTE = 1024 * KILOBYTE;

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
		this._cap.on("packet", (nBytes: number, trunc: boolean) => {
			console.log("packet: length " + nBytes + " bytes, truncated? " + (trunc ? "yes" : "no"));

			let ret = decoders.Ethernet(this._buf);

			if (ret.info.type === PROTOCOL.ETHERNET.IPV4) {
				console.log("Decoding IPv4 ...");

				ret = decoders.IPV4(this._buf, ret.offset);
				console.log("from: " + ret.info.srcaddr + " to " + ret.info.dstaddr);

				if (ret.info.protocol === PROTOCOL.IP.TCP) {
					var datalen = ret.info.totallen - ret.hdrlen;

					console.log("Decoding TCP ...");

					ret = decoders.TCP(this._buf, ret.offset);
					console.log(" from port: " + ret.info.srcport + " to port: " + ret.info.dstport);
					datalen -= ret.hdrlen;
					console.log(this._buf);
				}
			}
		});
	}
}
