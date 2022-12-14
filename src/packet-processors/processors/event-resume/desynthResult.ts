import { DesynthResult, EventResume } from "../../../definitions";

export function desynthResult(packet: EventResume): DesynthResult {
	return {
		...packet,
		itemId: packet.params[0] % 1000000,
		itemHq: packet.params[0] > 1000000,
		result: [1, 3, 5].map((index) => {
			return {
				itemId: packet.params[index] % 1000000,
				itemHq: packet.params[index] > 1000000,
				itemQuantity: packet.params[index + 1],
			};
		}),
		unknown: packet.params[7] != 0,
		unknown2: packet.params[8],
		unknown3: packet.params[9],
	};
}
