import { ActorControl } from "./ActorControl";

export interface FishingBaitMsg extends ActorControl {
	baitId: number;
	param2: number;
	param3: number;
	param4: number;
	param5: number;
}
