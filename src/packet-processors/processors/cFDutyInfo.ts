import { BufferReader } from "../../BufferReader";
import { CFDutyInfo } from "../../definitions/CFDutyInfo";

export function cFDutyInfo(reader: BufferReader): CFDutyInfo {
	return {
		penaltyTime: reader.nextUInt8(),
	};
}
