import { BufferReader } from "../../BufferReader";
import { ActorOwner } from "../../definitions/ActorOwner";

export function actorOwner(reader: BufferReader): ActorOwner {
	return {
		type: reader.nextUInt32(),
		actorId: reader.nextUInt32(),
		actorId2: reader.nextUInt32(),
	};
}
