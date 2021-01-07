import { BufferReader } from "../../BufferReader";
import { ActorSetPos } from "../../definitions/ActorSetPos";

export function actorSetPos(reader: BufferReader): ActorSetPos {
	return {
		r16: reader.nextUInt16(),
		waitForLoad: reader.nextUInt8(),
		unknown: reader.nextUInt8(),
		unknown2: reader.nextUInt32(),
		pos: reader.nextPosition3(),
		unknown3: reader.nextUInt32(),
	};
}
