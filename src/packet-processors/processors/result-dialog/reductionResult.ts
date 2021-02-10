import { ReductionResult, ResultDialog } from "../../../definitions";
import { BufferReader } from "../../../BufferReader";

export function reductionResult(packet: ResultDialog, reader: BufferReader): ReductionResult {
	return {
		...packet,
		unknown0: reader.nextUInt32(),
		unknown1: reader.nextUInt32(),
		itemId: reader.nextUInt32() % 500000,
		unknown2: reader.nextUInt32(),
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
