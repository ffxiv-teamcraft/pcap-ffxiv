import { BufferReader } from "../../BufferReader";
import { MarketBoardPurchase } from "../../definitions";

export function marketBoardPurchase(reader: BufferReader): MarketBoardPurchase {
	return {
		itemId: reader.nextUInt32(),
		quantity: reader.nextUInt32(),
	};
}
