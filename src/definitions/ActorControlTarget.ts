import { ActorControl } from "./ActorControl";

export interface ActorControlTarget extends ActorControl {
	targetId: bigint;
}
