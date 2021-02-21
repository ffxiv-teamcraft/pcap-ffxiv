import { BufferReader } from "../../BufferReader";
import { MarketBoardPurchase } from "../../definitions";

export function marketBoardPurchase(reader: BufferReader): MarketBoardPurchase {
	return {
		itemId: reader.nextUInt32(),
		quantity: reader.skip(4).nextUInt32(),
	};
}
