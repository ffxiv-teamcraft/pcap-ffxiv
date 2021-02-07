import { BufferReader } from "../../BufferReader";
import { ResultDialog } from "../../definitions";

export function resultDialog(reader: BufferReader): ResultDialog {
	return {
		category: reader.nextUInt32(),
	};
}
