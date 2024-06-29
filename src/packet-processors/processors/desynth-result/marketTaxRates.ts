import { DesynthResult, MarketTaxRates } from "../../../definitions";
import { BufferReader } from "../../../BufferReader";

export function marketTaxRates(packet: DesynthResult, reader: BufferReader): MarketTaxRates {
	return {
		...packet,
		limsaLominsa: reader.skip(0x08).nextUInt32(),
		gridania: reader.nextUInt32(),
		uldah: reader.nextUInt32(),
		ishgard: reader.nextUInt32(),
		kugane: reader.nextUInt32(),
		crystarium: reader.nextUInt32(),
		oldSharlayan: reader.nextUInt32(),
		tuliyollal: reader.nextUInt32(),
		validUntil: reader.nextUInt32(),
	};
}
