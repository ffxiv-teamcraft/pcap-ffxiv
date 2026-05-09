import { BufferReader } from "../../BufferReader";
import { FishCaught } from "../../definitions/FishCaught";

export function fishCaught(reader: BufferReader): FishCaught {
	return {
		itemId: reader.nextUInt32(),
		size: reader.nextUInt16(),
		unknown: reader.nextUInt16(),
		unknown2: reader.nextUInt32(),
		flags: reader.nextUInt32(),
	};
}
