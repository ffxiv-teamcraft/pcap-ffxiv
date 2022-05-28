import { BufferReader } from "../../BufferReader";
import { DesynthResult } from "../../definitions";

export function desynthResult(reader: BufferReader): DesynthResult {
	const unknown00 = reader.nextUInt32();
	const unknown01 = reader.nextUInt32();
	const itemResult = reader.nextUInt32();
	return {
		unknown0: unknown00, 
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
