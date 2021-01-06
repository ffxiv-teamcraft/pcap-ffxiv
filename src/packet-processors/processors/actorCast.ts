import { BufferReader } from "../../buffer-reader";
import { ActorCast } from "../../definitions/ActorCast";

export function actorCast(reader: BufferReader): ActorCast {
	return {
		actionId: reader.nextUInt16(),
		skillType: {
			0x1: "Normal",
			0x2: "ItemAction",
			0xd: "MountSkill",
		}[reader.nextUInt8()],
		castTime: reader.skip(5).nextFloat(),
		targetId: reader.nextUInt32(),
		rotation: reader.nextFloat(),
		pos: reader.nextPosition3UInt16(),
	};
}
