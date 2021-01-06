import { BufferReader } from "../../buffer-reader";
import { StatusEffectList } from "../../definitions/StatusEffectList";

export function statusEffectList(reader: BufferReader): StatusEffectList {
	return {
		classID: reader.nextUInt8(),
		level1: reader.nextUInt8(),
		level: reader.nextUInt16(),
		currentHP: reader.nextUInt32(),
		maxHP: reader.nextUInt32(),
		currentMP: reader.nextUInt16(),
		maxMP: reader.nextUInt16(),
		currentTP: reader.nextUInt16(),
		effects: Array(30).map(() => {
			return {
				effectID: reader.nextUInt16(),
				unknown1: reader.nextUInt16(),
				duration: reader.nextFloat(),
				sourceActorID: reader.nextUInt32(),
			};
		}),
	};
}
