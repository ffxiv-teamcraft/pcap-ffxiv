import { UpdateClassInfo } from "../../definitions";
import { BufferReader } from "../../buffer-reader";

export function updateClassInfo(reader: BufferReader): UpdateClassInfo {
	return {
		classId: reader.nextUInt8(),
		level1: reader.nextUInt8(),
		level: reader.nextUInt16(),
		nextLevelIndex: reader.nextUInt32(),
		currentExp: reader.nextUInt32(),
		restedExp: reader.nextUInt32(),
	};
}
