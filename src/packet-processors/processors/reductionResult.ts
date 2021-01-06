import { BufferReader } from "../../buffer-reader";
import { ReductionResult } from "../../definitions/ReductionResult";

export function reductionResult(reader: BufferReader): ReductionResult {
	return {
		unknown0: reader.nextUInt32(),
		unknown1: reader.nextUInt32(),
		itemId: reader.nextUInt32() % 500000,
		unknown2: reader.nextUInt32(),
		result: Array(3).map(() => {
			const itemResult = reader.nextUInt32();
			return {
				itemId: itemResult % 1000000,
				itemHQ: itemResult > 1000000,
				itemQuantity: reader.nextUInt32(),
			};
		}),
	};
}
