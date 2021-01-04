import { ItemInfo } from "../definitions";

export function itemInfo(buf: Buffer): ItemInfo {
	return {
		containerSequence: buf.readUInt32LE(0x00),
		unknown: buf.readUInt32LE(0x04),
		containerId: buf.readUInt16LE(0x08),
		slot: buf.readUInt16LE(0x0a),
		quantity: buf.readUInt32LE(0x0c),
		catalogId: buf.readUInt32LE(0x10),
		reservedFlag: buf.readUInt32LE(0x14),
		signatureId: buf.readBigUInt64LE(0x18),
		hqFlag: Boolean(buf.readUInt8(0x20)),
		unknown2: buf.readUInt8(0x21),
		condition: buf.readUInt16LE(0x22),
		spiritBond: buf.readUInt16LE(0x24),
		stain: buf.readUInt16LE(0x26),
		glamourCatalogId: buf.readUInt32LE(0x28),
		materia: [
			buf.readUInt16LE(0x2a),
			buf.readUInt16LE(0x2c),
			buf.readUInt16LE(0x2e),
			buf.readUInt16LE(0x30),
			buf.readUInt16LE(0x32),
		],
		materiaTiers: [
			buf.readUInt8(0x34),
			buf.readUInt8(0x35),
			buf.readUInt8(0x36),
			buf.readUInt8(0x37),
			buf.readUInt8(0x38),
		],
		padding: buf.readUInt8(0x39),
		unknown10: buf.readUInt32LE(0x40),
	};
}
