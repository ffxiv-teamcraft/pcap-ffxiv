import { MarketTaxRates } from "../../definitions";
import { BufferReader } from "../../BufferReader";

export function marketTaxRates(reader: BufferReader): MarketTaxRates {
	return {
		type: reader.nextUInt32(),
		category: reader.nextUInt16(),
		unknown1: reader.nextUInt8(),
		unknown2: reader.nextUInt8(),
		limsaLominsa: reader.nextUInt32(),
		gridania: reader.nextUInt32(),
		uldah: reader.nextUInt32(),
		ishgard: reader.nextUInt32(),
		kugane: reader.nextUInt32(),
		crystarium: reader.nextUInt32(),
		unknown3: reader.nextUInt32(),
	};
}
