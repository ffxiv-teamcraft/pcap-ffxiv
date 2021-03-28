import { EventPlayN } from "../../definitions";
import { BufferReader } from "../../BufferReader";

export function eventPlayN(reader: BufferReader): EventPlayN {
	const eventPlayN: Partial<EventPlayN> = {
		actorId: reader.nextUInt64(),
		eventId: reader.nextUInt32(),
		scene: reader.nextUInt16(),
		padding: reader.nextUInt16(),
		sceneFlags: reader.nextUInt32(),
		unknown: reader.nextUInt32(),
		paramSize: reader.nextUInt8(),
		padding1: reader.nextUInt8(),
		padding2: reader.nextUInt16(),
	};

	const paramsBuf = reader.nextBuffer(4 * 32);
	eventPlayN.params = Array.from(
		new Uint32Array(paramsBuf.buffer.slice(paramsBuf.byteOffset, paramsBuf.byteOffset + paramsBuf.byteLength)),
	);
	return eventPlayN as EventPlayN;
}
