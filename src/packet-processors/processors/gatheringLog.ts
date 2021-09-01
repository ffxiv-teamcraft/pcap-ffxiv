import { BufferReader } from "../../BufferReader";
import { GatheringLog } from "../../definitions";

export function gatheringLog(reader: BufferReader): GatheringLog {
	return {
		log: reader.restAsBuffer(),
	};
}
