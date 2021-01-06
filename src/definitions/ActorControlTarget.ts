import { ActorControl } from "./ActorControl";

export interface ActorControlTarget extends ActorControl {
	targetID: bigint;
}
