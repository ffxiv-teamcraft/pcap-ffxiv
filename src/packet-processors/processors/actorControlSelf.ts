import { BufferReader } from "../../BufferReader";
import { ActorControlSelf } from "../../definitions";

export function actorControlSelf(reader: BufferReader): ActorControlSelf {
	return {
		category: reader.nextUInt16(),
		padding: reader.nextUInt16(),
		param1: reader.nextUInt32(),
		param2: reader.nextUInt32(),
		param3: reader.nextUInt32(),
		param4: reader.nextUInt32(),
		param5: reader.nextUInt32(),
		param6: reader.nextUInt32(),
		padding1: reader.nextUInt32(),
	};
}
