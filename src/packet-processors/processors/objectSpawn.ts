import { BufferReader } from "../../BufferReader";
import { ObjectSpawn } from "../../definitions";

export function objectSpawn(reader: BufferReader): ObjectSpawn {
	return {
		spawnIndex: reader.nextUInt8(),
		objKind: reader.nextUInt8(),
		state: reader.nextUInt8(),
		unknown3: reader.nextUInt8(),
		objId: reader.nextUInt32(),
		actorId: reader.nextUInt32(),
		levelId: reader.nextUInt32(),
		unknown10: reader.nextUInt32(),
		someActorId14: reader.nextUInt32(),
		gimmickId: reader.nextUInt32(),
		scale: reader.nextFloat(),
		rotation: reader.nextUInt16(),
		housingLink: reader.nextUInt32(),
		position: reader.nextPosition3(),
	};
}
