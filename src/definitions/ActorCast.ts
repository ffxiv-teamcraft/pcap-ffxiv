import { Position3 } from "./Position3";

export interface ActorCast {
	actionId: number;
	skillType: "Normal" | "ItemAction" | "MountSkill";
	castTime: number;
	targetId: number;
	rotation: number;
	pos: Position3;
}
