import { MarketBoardItemListingHistory } from "../../definitions";
import { BufferReader } from "../../buffer-reader";

export function marketBoardItemListingHistory(reader: BufferReader): MarketBoardItemListingHistory {
	return {
		itemCatalogId: reader.nextUInt32(),
		itemCatalogId2: reader.nextUInt32(),
		listings: Array(20).map(() => {
			const chunk = reader.nextBuffer(52, true);
			return {
				salePrice: chunk.nextUInt32(),
				purchaseTime: chunk.nextUInt32(),
				quantity: chunk.nextUInt32(),
				isHq: Boolean(chunk.nextUInt8()),
				padding: chunk.nextUInt8(),
				onMannequin: Boolean(chunk.nextUInt8()),
				buyerName: chunk.nextString("utf8", 0x20),
				itemCatalogId: chunk.nextUInt32(),
			};
		}),
	};
}
