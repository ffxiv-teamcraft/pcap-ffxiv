export interface EffectResult {
	unknown1: number;
	globalSequence: number;
	actorId: number;
	currentHp: number;
	maxHp: number;
	currentMp: number;
	unknown2: number;
	classId: number;
	shieldPercentage: number;
	entryCount: number;
	unknown3: number;
	statusEntries: {
		index: number;
		unknown4: number;
		id: number;
		param: number;
		unknown5: number;
		duration: number;
		sourceActorId: number;
	}[];
}
