import { BufferReader } from "../../BufferReader";
import { CFPlayerInNeed } from "../../definitions";

export function cFPlayerInNeed(reader: BufferReader): CFPlayerInNeed {
	return {
		// Ordered by roulette	id
		inNeeds: reader.nextBuffer(0x10),
	};
}
