import { BufferReader } from "../../BufferReader";
import { CFDutyInfo } from "../../definitions";

export function cFDutyInfo(reader: BufferReader): CFDutyInfo {
	return {
		penaltyTime: reader.nextUInt8(),
	};
}
