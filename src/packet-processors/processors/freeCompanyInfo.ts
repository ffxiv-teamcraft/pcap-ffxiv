import { BufferReader } from "../../BufferReader";
import { FreeCompanyInfo } from "../../definitions/FreeCompanyInfo";

export function freeCompanyInfo(buffer: BufferReader): FreeCompanyInfo {
	return {
		freeCompanyId: buffer.nextUInt64().toString(),
		unknown0: Array(37).fill(null).map(() => {
			return buffer.nextUInt8();
		}),
		rank: buffer.nextUInt8(),
		unknown1: Array(34).fill(null).map(() => buffer.nextUInt8()),
	}
}
