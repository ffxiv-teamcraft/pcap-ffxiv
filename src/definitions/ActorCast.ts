import { Vector3 } from "./common/Vector3";

export interface ActorCast {
	actionID: number;
	skillType: "Normal" | "ItemAction" | "MountSkill";
	castTime: number;
	targetID: number;
	rotation: number;
	pos: Vector3;
}
