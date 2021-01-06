export interface StatusEffectList {
	classID: number;
	level1: number;
	level: number;
	currentHP: number;
	maxHP: number;
	currentMP: number;
	maxMP: number;
	currentTP: number;
	effects: {
		effectID: number;
		unknown1: number;
		duration: number;
		sourceActorID: number;
	}[];
}
