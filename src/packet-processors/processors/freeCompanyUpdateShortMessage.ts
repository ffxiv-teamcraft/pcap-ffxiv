import { BufferReader } from "../../BufferReader";
import { FreeCompanyUpdateShortMessage } from "../../definitions";

export function freeCompanyUpdateShortMessage(reader: BufferReader): FreeCompanyUpdateShortMessage {
	return {
		message: reader.nextString(0x10),
	};
}
