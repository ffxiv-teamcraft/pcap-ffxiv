import { MarketBoardItemListingHistory } from "../../definitions";
import { BufferReader } from "../../BufferReader";

export function marketBoardItemListingHistory(reader: BufferReader): MarketBoardItemListingHistory {
	return {
		itemCatalogId: reader.nextUInt32(),
		listings: Array(20)
			.fill(null)
			.map(() => {
				const chunk = reader.nextBuffer(48, true);
				return {
					salePrice: chunk.nextUInt32(),
					purchaseTime: chunk.nextUInt32(),
					quantity: chunk.nextUInt32(),
					isHq: Boolean(chunk.nextUInt8()),
					onMannequin: Boolean(chunk.nextUInt8()),
					buyerName: chunk.nextString(0x20),
					padding: chunk.nextUInt16(),
				};
			})
			.filter((sale) => sale.salePrice !== 0),
	};
}
