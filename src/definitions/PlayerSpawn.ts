import { Position3 } from "./Position3";

export interface PlayerSpawn {
	title: number;
	u1b: number;
	currentWorldId: number;
	homeWorldId: number;

	gmRank: number;
	u3c: number;
	u4: number;
	onlineStatus: number;

	pose: number;
	u5a: number;
	u5b: number;
	u5c: number;

	targetId: bigint;
	u6: number;
	u7: number;
	mainWeaponModel: bigint;
	secWeaponModel: bigint;
	craftToolModel: bigint;

	u14: number;
	u15: number;
	bNpcBase: number;
	bNpcName: number;
	u18: number;
	u19: number;
	directorId: number;
	ownerId: number;
	u22: number;
	hPMax: number;
	hPCurr: number;
	displayFlags: number;
	fateId: number;
	mPCurr: number;
	mPMax: number;
	unk: number;
	modelChara: number;
	rotation: number;
	activeMinion: number;
	spawnIndex: number;
	state: number;
	persistentEmote: number;
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

	elementData: number;
	unk28?: number;
	unk28b?: number;
	unk28c?: number;

	effects: {
		id: number;
		param: number;
		duration: number;
		sourceActorId: number;
	}[];
	pos: Position3;
	models: number[];
	name: string;
	look: number[];
	unk29?: number;
	unk29b?: number;
	unk29c?: number;
	unk29d?: number;
	fcTag: string;
	unk30: number;
}
