import { BufferReader } from "../../BufferReader";
import { CraftingLog } from "../../definitions";

export function craftingLog(reader: BufferReader): CraftingLog {
	return {
		log: reader.restAsBuffer(),
	};
}
