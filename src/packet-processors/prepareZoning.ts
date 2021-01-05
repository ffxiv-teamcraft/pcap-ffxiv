import { PrepareZoning } from "../definitions";

export function prepareZoning(buf: Buffer): PrepareZoning {
	return {
		logMessage: buf.readUInt32LE(0x00),
		targetZone: buf.readUInt16LE(0x04),
		animation: buf.readUInt16LE(0x06),
		param4: buf.readUInt8(0x08),
		hideChar: buf.readUInt8(0x09),
		fadeOut: buf.readUInt8(0x0a),
		param7: buf.readUInt8(0x0b),
		fadeOutTime: buf.readUInt8(0x0c),
		unknown: buf.readUInt8(0x0d),
		padding: buf.readUInt16LE(0x0e),
	};
}
