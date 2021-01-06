import { ActorControl } from "../../definitions";
import { BufferReader } from "../../buffer-reader";

export function actorControl(reader: BufferReader): ActorControl {
	return {
		category: reader.nextUInt16(),
		padding: reader.nextUInt16(),
		param1: reader.nextUInt32(),
		param2: reader.nextUInt32(),
		param3: reader.nextUInt32(),
		param4: reader.nextUInt32(),
		padding1: reader.nextUInt32(),
	};
}
