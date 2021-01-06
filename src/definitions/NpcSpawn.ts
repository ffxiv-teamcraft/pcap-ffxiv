import { Position3 } from "./Position3";

export interface NpcSpawn {
	gimmickId: number;
	u2b: number;
	u2ab: number;
	gmRank: number;
	u3b: number;
	aggressionMode: number;
	onlineStatus: number;
	u3c: number;
	pose: number;
	u4: number;
	targetId: bigint;
	u6: number;
	u7: number;
	mainWeaponModel: bigint;
	secWeaponModel: bigint;
	craftToolModel: bigint;
	u14: number;
	u15: number;
	bNPCBase: number;
	bNPCName: number;
	levelId: number;
	u19: number;
	directorId: number;
	spawnerId: number;
	parentActorId: number;
	hPMax: number;
	hPCurr: number;
	displayFlags: number;
	fateID: number;
	mPCurr: number;
	tPCurr: number;
	mPMax: number;
	tPMax: number;
	modelChara: number;
	rotation: number;
	activeMinion: number;
	spawnIndex: number;
	state: number;
	persistantEmote: number;
	modelType: number;
	subtype: number;
	voice: number;
	u25c: number;
	enemyType: number;
	level: number;
	classJob: number;
	u26d: number;
	u27a: number;
	currentMount: number;
	mountHead: number;
	mountBody: number;
	mountFeet: number;
	mountColor: number;
	scale: number;
	elementalLevel: number;
	element: number;
	u30b: number;
	effects: { ID: number; sourceActorID: number }[];
	models: number[];
	looks: number[];
	effect_id: number;
	sourceActorId: number;
	pos: Position3;
	name: string;
	fcTag: string;
	bNPCPartSlot: number;
}
