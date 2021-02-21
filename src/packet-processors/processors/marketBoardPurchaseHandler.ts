import { BufferReader } from "../../BufferReader";
import { MarketBoardPurchaseHandler } from "../../definitions";

export function marketBoardPurchaseHandler(reader: BufferReader): MarketBoardPurchaseHandler {
	return {
		retainerId: reader.nextUInt64(),
		listingId: reader.nextUInt64(),
		itemId: reader.nextUInt32(),
		quantity: reader.nextUInt32(),
		pricePerUnit: reader.nextUInt32(),
	};
}
