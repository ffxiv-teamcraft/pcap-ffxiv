import { BufferReader } from "../../BufferReader";
import { StatusEffectList } from "../../definitions";

export function statusEffectList(reader: BufferReader): StatusEffectList {
	return {
		classId: reader.nextUInt8(),
		level1: reader.nextUInt8(),
		level: reader.nextUInt16(),
		currentHp: reader.nextUInt32(),
		maxHp: reader.nextUInt32(),
		currentMp: reader.nextUInt16(),
		maxMp: reader.nextUInt16(),
		currentTp: reader.nextUInt16(),
		effects: Array(30)
			.fill(null)
			.map(() => {
				return {
					unknown1: reader.nextUInt16(),
					effectId: reader.nextUInt16(),
					duration: reader.nextFloat(),
					sourceActorId: reader.nextUInt32(),
				};
			}),
	};
}
