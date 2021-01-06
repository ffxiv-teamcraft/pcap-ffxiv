export interface StatusEffectList {
	classId: number;
	level1: number;
	level: number;
	currentHp: number;
	maxHp: number;
	currentMp: number;
	maxMp: number;
	currentTP: number;
	effects: {
		effectId: number;
		unknown1: number;
		duration: number;
		sourceActorId: number;
	}[];
}
