import { BufferReader } from "../../BufferReader";
import { ActorFreeSpawn } from "../../definitions";

export function actorFreeSpawn(reader: BufferReader): ActorFreeSpawn {
	return {
		spawnId: reader.nextUInt32(),
		actorId: reader.nextUInt32(),
	};
}
