import { BufferReader } from "../../BufferReader";
import { EventResume } from "../../definitions";

export function eventResume(reader: BufferReader): EventResume {
	return {
		category: reader.nextUInt32(),
		subcategory: reader.nextUInt16(),
		scene: reader.nextUInt8(),
		params: Array(reader.nextUInt8())
			.fill(null)
			.map(() => reader.nextUInt32()),
	};
}
