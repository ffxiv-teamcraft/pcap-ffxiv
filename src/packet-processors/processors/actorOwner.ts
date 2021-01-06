import { BufferReader } from "../../buffer-reader";
import { ActorOwner } from "../../definitions/ActorOwner";

export function actorOwner(reader: BufferReader): ActorOwner {
	return {
		type: reader.nextUInt32(),
		actorID: reader.nextUInt32(),
		actorID2: reader.nextUInt32(),
	};
}
