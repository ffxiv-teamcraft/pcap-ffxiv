import { BufferReader } from "../../buffer-reader";
import { CFDutyInfo } from "../../definitions/CFDutyInfo";

export function cFDutyInfo(reader: BufferReader): CFDutyInfo {
	return {
		penaltyTime: reader.nextUInt8(),
	};
}
