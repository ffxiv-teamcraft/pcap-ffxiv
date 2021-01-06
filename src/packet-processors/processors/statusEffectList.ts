import { BufferReader } from "../../buffer-reader";
import { StatusEffectList } from "../../definitions/StatusEffectList";

export function statusEffectList(reader: BufferReader): StatusEffectList {
	return {
		classId: reader.nextUInt8(),
		level1: reader.nextUInt8(),
		level: reader.nextUInt16(),
		currentHp: reader.nextUInt32(),
		maxHp: reader.nextUInt32(),
		currentMp: reader.nextUInt16(),
		maxMp: reader.nextUInt16(),
		currentTP: reader.nextUInt16(),
		effects: Array(30).map(() => {
			return {
				effectId: reader.nextUInt16(),
				unknown1: reader.nextUInt16(),
				duration: reader.nextFloat(),
				sourceActorId: reader.nextUInt32(),
			};
		}),
	};
}
