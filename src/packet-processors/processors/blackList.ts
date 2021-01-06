import { BufferReader } from "../../buffer-reader";
import { BlackList } from "../../definitions/BlackList";

export function blackList(reader: BufferReader): BlackList {
	return {
		entries: Array(20).map(() => {
			return {
				contentId: reader.nextUInt64(),
				name: reader.nextString(32),
			};
		}),
		sequence: reader.nextUInt16(),
	};
}
