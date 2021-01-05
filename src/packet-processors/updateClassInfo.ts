import { UpdateClassInfo } from "../definitions";

export function updateClassInfo(buf: Buffer): UpdateClassInfo {
	return {
		classId: buf.readUInt8(0x00),
		level1: buf.readUInt8(0x01),
		level: buf.readUInt16LE(0x02),
		nextLevelIndex: buf.readUInt32LE(0x04),
		currentExp: buf.readUInt32LE(0x08),
		restedExp: buf.readUInt32LE(0x0c),
	};
}
