import { TalkEvent } from "../../../../definitions";
import { MarketTaxRates } from "../../../../definitions/event-resume/talk-event/MarketTaxRates";

export function marketTaxRates(packet: TalkEvent): MarketTaxRates {
	return {
		...packet,
		limsaLominsa: packet.params[0],
		gridania: packet.params[1],
		uldah: packet.params[2],
		ishgard: packet.params[3],
		kugane: packet.params[4],
		crystarium: packet.params[5],
		oldSharlayan: packet.params[6],
	};
}
