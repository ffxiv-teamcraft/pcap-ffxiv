export interface StatusEffectList {
	classId: number;
	level1: number;
	level: number;
	currentHP: number;
	maxHP: number;
	currentMP: number;
	maxMP: number;
	currentTP: number;
	effects: {
		effectId: number;
		unknown1: number;
		duration: number;
		sourceActorId: number;
	}[];
}
