import { ActorControl, DailyQuestSeed } from "../../../definitions";

export function dailyQuestSeed(packet: ActorControl): DailyQuestSeed {
	return {
		...packet,
		dailyQuestSeed: +packet.param1,
	};
}
