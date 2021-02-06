import { ActorControl } from "../ActorControl";

export interface FishingBaitMsg extends ActorControl {
	baitId: number;
}
