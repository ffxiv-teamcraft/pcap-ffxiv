import { BufferReader } from "../../BufferReader";
import { CFAvailableContents } from "../../definitions";

export function cFAvailableContents(reader: BufferReader): CFAvailableContents {
	return {
		contents: reader.nextBuffer(0x48),
	};
}
