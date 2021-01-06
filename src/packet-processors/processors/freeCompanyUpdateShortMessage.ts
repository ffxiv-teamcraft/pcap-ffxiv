import { BufferReader } from "../../buffer-reader";
import { FreeCompanyUpdateShortMessage } from "../../definitions/FreeCompanyUpdateShortMessage";

export function freeCompanyUpdateShortMessage(reader: BufferReader): FreeCompanyUpdateShortMessage {
	return {
		message: reader.nextString(0x10),
	};
}
