import { InitZone } from "../definitions";

export function initZone(buf: Buffer): InitZone {
	return {
		serverId: buf.readUInt16LE(0x00),
		zoneId: buf.readUInt16LE(0x02),
		unknown1: buf.readUInt16LE(0x04),
		contentfinderConditionId: buf.readUInt16LE(0x06),
		unknown3: buf.readUInt32LE(0x08),
		unknown4: buf.readUInt32LE(0x0c),
		weatherId: buf.readUInt8(0x10),
		bitmask: buf.readUInt8(0x11),
		bitmask1: buf.readUInt8(0x12),
		unknown5: buf.readUInt8(0x13),
		unknown8: buf.readUInt32LE(0x14),
		festivalId: buf.readUInt16LE(0x18),
		additionalFestivalId: buf.readUInt16LE(0x1a),
		unknown9: buf.readUInt32LE(0x1c),
		unknown10: buf.readUInt32LE(0x20),
		unknown11: buf.readUInt32LE(0x24),
		unknown12: Array.from(new Uint32Array(buf.slice(0x28, 0x28 + 4 * 4))),
		unknown13: Array.from(new Uint32Array(buf.slice(0x38, 0x38 + 4 * 3))),
		pos: {
			x: buf.readFloatLE(0x44),
			y: buf.readFloatLE(0x48),
			z: buf.readFloatLE(0x4c),
		},
		unknown14: Array.from(new Uint32Array(buf.slice(0x50, 0x50 + 4 * 3))),
		unknown15: buf.readUInt32LE(0x5c),
	};
}
