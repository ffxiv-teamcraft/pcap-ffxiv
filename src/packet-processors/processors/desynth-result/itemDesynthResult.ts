import { BufferReader } from "../../../BufferReader";
import { ItemDesynthResult } from "../../../definitions/desynth-result/ItemDesynthResult";
import { DesynthResult } from "../../../definitions/DesynthResult";

export function itemDesynthResult(packet: DesynthResult, reader: BufferReader): ItemDesynthResult {
	const unknown01 = reader.nextUInt32();
	const itemResult = reader.nextUInt32();
	return {
		...packet,
		unknown1: unknown01,
		itemId: itemResult % 1000000,
		itemHq: itemResult > 1000000,
		result: Array(3)
			.fill(null)
			.map(() => {
				const itemResult = reader.nextUInt32();
				return {
					itemId: itemResult % 1000000,
					itemHq: itemResult > 1000000,
					itemQuantity: reader.nextUInt32(),
				};
			}),
	};
}
