import { Position3 } from "./Position3";

export interface ActorCast {
	actionID: number;
	skillType: "Normal" | "ItemAction" | "MountSkill";
	castTime: number;
	targetID: number;
	rotation: number;
	pos: Position3;
}
