import { EventPlayN } from "../definitions";

export function eventPlayN(buf: Buffer): EventPlayN {
	return {
		actorId: buf.readBigUInt64LE(0x00),
		eventId: buf.readUInt32LE(0x08),
		scene: buf.readUInt16LE(0x0c),
		padding: buf.readUInt16LE(0x0e),
		sceneFlags: buf.readUInt32LE(0x10),
		unknown: buf.readUInt32LE(0x1c),
		paramSize: buf.readUInt8(0x20),
		padding1: buf.readUInt8(0x21),
		padding2: buf.readUInt16LE(0x22),
	};
}
