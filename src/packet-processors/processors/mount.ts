import { BufferReader } from "../../BufferReader";
import { Mount } from "../../definitions/Mount";

export function mount(reader: BufferReader): Mount {
	return {
		id: reader.nextUInt32(),
	};
}
