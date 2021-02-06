import { ActorControl } from "../ActorControl";

export interface EObjSetState extends ActorControl {
	state: number;
	actorId: number;
}
