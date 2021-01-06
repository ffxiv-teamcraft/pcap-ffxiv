import { BufferReader } from "../../buffer-reader";
import { CFAvailableContents } from "../../definitions/CFAvailableContents";

export function cFAvailableContents(reader: BufferReader): CFAvailableContents {
	return {
		contents: reader.nextBuffer(0x48),
	};
}
