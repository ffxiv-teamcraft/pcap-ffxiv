import { BufferReader } from "../../buffer-reader";
import { ActorFreeSpawn } from "../../definitions/ActorFreeSpawn";

export function actorFreeSpawn(reader: BufferReader): ActorFreeSpawn {
	return {
		spawnID: reader.nextUInt32(),
		actorID: reader.nextUInt32(),
	};
}
