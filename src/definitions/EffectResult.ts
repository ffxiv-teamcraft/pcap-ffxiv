export interface EffectResult {
	globalSequence: number;
	actorId: number;
	currentHp: number;
	maxHp: number;
	currentMp: number;
	unknown1: number;
	classId: number;
	shieldPercentage: number;
	entryCount: number;
	unknown2: number;
	statusEntries: {
		index: number;
		unknown3: number;
		id: number;
		param: number;
		unknown4: number;
		duration: number;
		sourceActorId: number;
	}[];
}
