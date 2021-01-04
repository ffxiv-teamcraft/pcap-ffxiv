import { CurrencyCrystalInfo } from "../definitions";

export function currencyCrystalInfo(buf: Buffer): CurrencyCrystalInfo {
	return {
		containerSequence: buf.readUInt32LE(0x00),
		containerId: buf.readUInt16LE(0x04),
		slot: buf.readUInt16LE(0x06),
		quantity: buf.readUInt32LE(0x08),
		unknown: buf.readUInt32LE(0x0c),
		catalogId: buf.readUInt32LE(0x10),
		unknown1: buf.readUInt32LE(0x14),
		unknown2: buf.readUInt32LE(0x18),
		unknown3: buf.readUInt32LE(0x1c),
	};
}
