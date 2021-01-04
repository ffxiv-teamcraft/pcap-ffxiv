import { MarketTaxRates } from "../definitions";

export function marketTaxRates(buf: Buffer): MarketTaxRates {
	return {
		type: buf.readUInt32LE(0x00),
		category: buf.readUInt16LE(0x04),
		unknown1: buf.readUInt8(0x06),
		unknown2: buf.readUInt8(0x07),
		limsaLominsa: buf.readUInt32LE(0x08),
		gridania: buf.readUInt32LE(0x0c),
		uldah: buf.readUInt32LE(0x10),
		ishgard: buf.readUInt32LE(0x14),
		kugane: buf.readUInt32LE(0x18),
		crystarium: buf.readUInt32BE(0x1c),
		unknown3: buf.readUInt32BE(0x20),
	};
}
