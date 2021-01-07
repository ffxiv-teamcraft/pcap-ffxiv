import { BufferReader } from "../../BufferReader";
import { EorzeaTimeOffset } from "../../definitions/EorzeaTimeOffset";

export function eorzeaTimeOffset(reader: BufferReader): EorzeaTimeOffset {
	return {
		timestamp: reader.nextUInt64(),
	};
}
