import { EventResume } from "../../../definitions";
import { TalkEvent } from "../../../definitions/event-resume/TalkEvent";
import { TalkEventType } from "../../../models/TalkEventType";
import { marketTaxRates } from "./talk-event/marketTaxRates";

export function talkEvent(packet: EventResume): TalkEvent {
	switch (packet.subcategory as TalkEventType) {
		case TalkEventType.MarketTaxRates:
			return marketTaxRates(packet);
		default:
			return {
				...packet,
			};
	}
}
