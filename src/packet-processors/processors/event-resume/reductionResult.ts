import { ReductionResult, EventResume } from "../../../definitions";

export function reductionResult(packet: EventResume): ReductionResult {
	return {
		...packet,
		itemId: packet.params[0] % 500000,
		unknown: packet.params[1] != 0,
		result: [2, 4, 6].map((index) => {
			return {
				itemId: packet.params[index] % 1000000,
				itemHq: packet.params[index] > 1000000,
				itemQuantity: packet.params[index + 1],
			};
		}),
	};
}
