import { ActorControl } from "../ActorControl";

export interface ActionStart extends ActorControl {
	actionId: number;
	actionCooldown: number;
}
