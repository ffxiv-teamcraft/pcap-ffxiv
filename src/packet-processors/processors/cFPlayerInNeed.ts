import { BufferReader } from "../../buffer-reader";
import { CFPlayerInNeed } from "../../definitions/CFPlayerInNeed";

export function cFPlayerInNeed(reader: BufferReader): CFPlayerInNeed {
	return {
		// Ordered by roulette Id
		inNeeds: reader.nextBuffer(0x10),
	};
}
