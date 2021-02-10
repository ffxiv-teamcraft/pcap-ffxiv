import { BufferReader } from "../../BufferReader";
import { BlackList } from "../../definitions";

export function blackList(reader: BufferReader): BlackList {
	return {
		entries: Array(20)
			.fill(null)
			.map(() => {
				return {
					contentId: reader.nextUInt64(),
					name: reader.nextString(32),
				};
			}),
		sequence: reader.nextUInt16(),
	};
}
