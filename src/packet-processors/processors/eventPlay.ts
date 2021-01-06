import { EventPlay } from "../../definitions";
import { BufferReader } from "../../buffer-reader";

export function eventPlay(reader: BufferReader): EventPlay {
	return {
		actorId: reader.nextUInt64(),
		eventId: reader.nextUInt32(),
		scene: reader.nextUInt16(),
		padding: reader.nextUInt16(),
		flags: reader.nextUInt32(),
		param3: reader.nextUInt32(),
		param4: reader.nextUInt8(),
		padding1: reader.nextUInt8(),
		padding2: reader.nextUInt16(),
		param5: reader.nextUInt32(),
		unknown: reader.nextUInt64(),
	};
}
