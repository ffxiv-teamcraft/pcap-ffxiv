import { EventPlayN } from "../../definitions";
import { BufferReader } from "../../buffer-reader";

export function eventPlayN(reader: BufferReader): EventPlayN {
	return {
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
}
