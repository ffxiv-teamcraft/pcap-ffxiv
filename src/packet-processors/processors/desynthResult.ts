import { BufferReader } from "../../BufferReader";
import { DesynthResult } from "../../definitions/DesynthResult";

export function desynthResult(reader: BufferReader): DesynthResult {
	return {
		category: reader.nextUInt32(),
	};
}
