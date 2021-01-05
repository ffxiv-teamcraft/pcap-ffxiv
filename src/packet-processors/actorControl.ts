import { ActorControl } from "../definitions";

export function actorControl(buf: Buffer): ActorControl {
	return {
		category: buf.readUInt16LE(0x00),
		padding: buf.readUInt16LE(0x02),
		param1: buf.readUInt32LE(0x04),
		param2: buf.readUInt32LE(0x08),
		param3: buf.readUInt32LE(0x0c),
		param4: buf.readUInt32LE(0x10),
		padding1: buf.readUInt32LE(0x14),
	};
}
