import { BufferReader } from "../../BufferReader";
import { UpdateHpMpTp } from "../../definitions/UpdateHpMpTp";

export function updateHpMpTp(reader: BufferReader): UpdateHpMpTp {
	return {
		hp: reader.nextUInt32(),
		mp: reader.nextUInt16(),
		tp: reader.nextUInt16(),
		gp: reader.nextUInt16(),
	};
}
