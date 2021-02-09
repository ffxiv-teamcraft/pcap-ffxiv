import { BufferReader } from "../../BufferReader";
import { EorzeaTimeOffset } from "../../definitions";

export function eorzeaTimeOffset(reader: BufferReader): EorzeaTimeOffset {
	return {
		timestamp: reader.nextUInt64(),
	};
}
