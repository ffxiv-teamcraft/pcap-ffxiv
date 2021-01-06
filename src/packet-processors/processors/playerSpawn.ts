import { BufferReader } from "../../buffer-reader";
import { PlayerSpawn } from "../../definitions/PlayerSpawn";

export function playerSpawn(reader: BufferReader): PlayerSpawn {
	return {
		title: reader.nextUInt16(),
		u1b: reader.nextUInt16(),
		currentWorldId: reader.nextUInt16(),
		homeWorldId: reader.nextUInt16(),

		gmRank: reader.nextUInt8(),
		u3c: reader.nextUInt8(),
		u4: reader.nextUInt8(),
		onlineStatus: reader.nextUInt8(),

		pose: reader.nextUInt8(),
		u5a: reader.nextUInt8(),
		u5b: reader.nextUInt8(),
		u5c: reader.nextUInt8(),

		targetId: reader.nextUInt64(),
		u6: reader.nextUInt32(),
		u7: reader.nextUInt32(),
		mainWeaponModel: reader.nextUInt64(),
		secWeaponModel: reader.nextUInt64(),
		craftToolModel: reader.nextUInt64(),

		u14: reader.nextUInt32(),
		u15: reader.nextUInt32(),
		bNpcBase: reader.nextUInt32(),
		bNpcName: reader.nextUInt32(),
		u18: reader.nextUInt32(),
		u19: reader.nextUInt32(),
		directorId: reader.nextUInt32(),
		ownerId: reader.nextUInt32(),
		u22: reader.nextUInt32(),
		hPMax: reader.nextUInt32(),
		hPCurr: reader.nextUInt32(),
		displayFlags: reader.nextUInt32(),
		fateId: reader.nextUInt16(),
		mPCurr: reader.nextUInt16(),
		mPMax: reader.nextUInt16(),
		unk: reader.nextUInt16(), // :: 0
		modelChara: reader.nextUInt16(),
		rotation: reader.nextUInt16(),
		activeMinion: reader.nextUInt16(),
		spawnIndex: reader.nextUInt8(),
		state: reader.nextUInt8(),
		persistentEmote: reader.nextUInt8(),
		modelType: reader.nextUInt8(),
		subtype: reader.nextUInt8(),
		voice: reader.nextUInt8(),
		u25c: reader.nextUInt16(),
		enemyType: reader.nextUInt8(),
		level: reader.nextUInt8(),
		classJob: reader.nextUInt8(),
		u26d: reader.nextUInt8(),
		u27a: reader.nextUInt16(),
		currentMount: reader.nextUInt8(),
		mountHead: reader.nextUInt8(),
		mountBody: reader.nextUInt8(),
		mountFeet: reader.nextUInt8(),
		mountColor: reader.nextUInt8(),
		scale: reader.nextUInt8(),

		//elementalLevel, one of these two field changed to 16bit
		//element,
		elementData: reader.nextUInt16(),

		effects: Array(30).map(() => {
			return {
				id: reader.nextUInt16(),
				param: reader.nextUInt16(),
				duration: reader.nextFloat(),
				sourceActorId: reader.nextUInt32(),
			};
		}),
		pos: reader.nextPosition3(),
		models: Array(10).map(() => reader.nextUInt32()),
		name: reader.nextString(32),
		look: Array(26).map(() => reader.nextUInt8()),
		fcTag: reader.nextString(6),
		unk30: reader.nextUInt32(),
	};
}
