import { BufferReader } from "../../buffer-reader";
import { CFRegisterDuty } from "../../definitions/CFRegisterDuty";

export function cFRegisterDuty(reader: BufferReader): CFRegisterDuty {
	return {
		rouletteID: reader.skip(4).nextUInt8(),
		contentID: reader.nextUInt16(),
	};
}
