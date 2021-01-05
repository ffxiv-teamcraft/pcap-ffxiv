import { RetainerInformation } from "../definitions";

export function retainerInformation(buf: Buffer): RetainerInformation {
	return {
		unknown0: buf.readBigUInt64LE(0x00),
		retainerId: buf.readBigUInt64LE(0x08),
		hireOrder: buf.readUInt8(0x10),
		itemCount: buf.readUInt8(0x11),
		unknown5: buf.readUInt16LE(0x12),
		gil: buf.readUInt32LE(0x14),
		sellingCount: buf.readUInt8(0x18),
		cityId: buf.readUInt8(0x19),
		classJob: buf.readUInt8(0x1a),
		level: buf.readUInt8(0x1b),
		unknown11: buf.readUInt32LE(0x1c),
		ventureId: buf.readUInt32LE(0x20),
		ventureComplete: buf.readUInt32LE(0x24),
		unknown14: buf.readUInt8(0x28),
		name: buf.slice(0x29, 0x29 + 20).toString("utf8"),
	};
}
