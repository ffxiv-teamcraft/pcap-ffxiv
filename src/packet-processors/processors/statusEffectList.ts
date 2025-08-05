import { BufferReader } from "../../BufferReader";
import { StatusEffectList } from "../../definitions";
import { ConstantsList, Region } from "../../models";

export function statusEffectList(reader: BufferReader, _constants: ConstantsList, region: Region): StatusEffectList {
	const data: StatusEffectList = {
		classId: reader.nextUInt8(),
		level1: reader.nextUInt8(),
		level: reader.nextUInt16(),
		currentHp: reader.nextUInt32(),
		maxHp: reader.nextUInt32(),
		currentMp: reader.nextUInt16(),
		maxMp: reader.nextUInt16(),
		currentTp: reader.nextUInt16(),
		unknown1: reader.nextUInt16(),
		effects: Array(30)
			.fill(null)
			.map(() => {
				return {
					effectId: reader.nextUInt16(),
					param: reader.nextUInt16(),
					duration: reader.nextFloat(),
					sourceActorId: reader.nextUInt32(),
				};
			}),
	};
	if (region == "Global") {
		// 7.3 added a random offset to status effect list that's sent everytime you zone,
		// but unless you have less than 30 effects, the offset is going to be easy to find in last entry.
		const idOffset = data.effects[data.effects.length - 1].effectId;
		data.effects = data.effects.map(e => {
			return {
				...e,
				effectId: e.effectId - idOffset
			}
		})
	}
	return data;
}
