import { BufferReader } from "../../BufferReader";
import { MarketBoardPurchaseHandler } from "../../definitions";
import { ConstantsList } from "../../models";

export function marketBoardPurchaseHandler(reader: BufferReader, constants: ConstantsList): MarketBoardPurchaseHandler {
	return {
		retainerId: reader.nextUInt64(),
		listingId: reader.nextUInt64(),
		itemId: reader.nextUInt32(),
		pricePerUnit: reader.nextUInt32(),
		quantity: reader.nextUInt32(),
	};
}
