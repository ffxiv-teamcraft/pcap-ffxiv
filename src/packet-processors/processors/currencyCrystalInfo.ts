import { CurrencyCrystalInfo } from "../../definitions";
import { BufferReader } from "../../buffer-reader";

export function currencyCrystalInfo(reader: BufferReader): CurrencyCrystalInfo {
	return {
		containerSequence: reader.nextUInt32(),
		containerId: reader.nextUInt16(),
		slot: reader.nextUInt16(),
		quantity: reader.nextUInt32(),
		unknown: reader.nextUInt32(),
		catalogId: reader.nextUInt32(),
		unknown1: reader.nextUInt32(),
		unknown2: reader.nextUInt32(),
		unknown3: reader.nextUInt32(),
	};
}
