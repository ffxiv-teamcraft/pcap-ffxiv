import { ActorControl, FishingBaitMsg } from "../../../definitions";

export function fishingBaitMsg(packet: ActorControl): FishingBaitMsg {
	return {
		...packet,
		baitId: packet.param1
	};
}
