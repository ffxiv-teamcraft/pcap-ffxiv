import { BufferReader } from "../../BufferReader";
import { CFRegisterDuty } from "../../definitions";

export function cFRegisterDuty(reader: BufferReader): CFRegisterDuty {
	return {
		rouletteId: reader.skip(4).nextUInt8(),
		contentId: reader.nextUInt16(),
	};
}
