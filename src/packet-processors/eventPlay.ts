import { EventPlay } from "../definitions";

export function eventPlay(buf: Buffer): EventPlay {
	return {
		actorId: buf.readBigUInt64LE(0x00),
		eventId: buf.readUInt32LE(0x08),
		scene: buf.readUInt16LE(0x0c),
		padding: buf.readUInt16LE(0x0e),
		flags: buf.readUInt32LE(0x10),
		param3: buf.readUInt32LE(0x1c),
		param4: buf.readUInt8(0x20),
		padding1: buf.readUInt8(0x21),
		padding2: buf.readUInt16LE(0x22),
		param5: buf.readUInt32LE(0x24),
		unknown: buf.readBigUInt64LE(0x28),
	};
}
