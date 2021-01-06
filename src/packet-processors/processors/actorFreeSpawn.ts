import { BufferReader } from "../../buffer-reader";
import { ActorFreeSpawn } from "../../definitions/ActorFreeSpawn";

export function actorFreeSpawn(reader: BufferReader): ActorFreeSpawn {
	return {
		spawnId: reader.nextUInt32(),
		actorId: reader.nextUInt32(),
	};
}
