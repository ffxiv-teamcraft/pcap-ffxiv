import { BufferReader } from "../../buffer-reader";
import { DesynthResult } from "../../definitions/DesynthResult";

export function desynthResult(reader: BufferReader): DesynthResult {
	return {
		unknown0: reader.nextUInt32(),
		unknown1: reader.nextUInt32(),
		itemId: reader.nextUInt32() % 1000000,
		itemHq: reader.nextUInt32() > 1000000,
		itemResultId: reader.nextUInt32() % 1000000,
		itemResultHq: reader.nextUInt32() > 1000000,
		itemResultQuantity: reader.nextUInt32(),
	};
}
