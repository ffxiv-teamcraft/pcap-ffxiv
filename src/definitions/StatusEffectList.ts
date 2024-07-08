export interface StatusEffectList {
	classId: number;
	level1: number;
	level: number;
	currentHp: number;
	maxHp: number;
	currentMp: number;
	maxMp: number;
	currentTp: number;
	unknown1: number;
	effects: {
		effectId: number;
		param: number;
		duration: number;
		sourceActorId: number;
	}[];
}
