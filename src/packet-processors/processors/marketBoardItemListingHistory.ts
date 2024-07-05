import { MarketBoardItemListingHistory } from "../../definitions";
import { BufferReader } from "../../BufferReader";
import { ConstantsList, Region } from "../../models";

export function marketBoardItemListingHistory(
	reader: BufferReader,
	constants: ConstantsList,
	region?: Region,
): MarketBoardItemListingHistory {
	if (region !== "Global") {
		return {
			itemCatalogId: reader.nextUInt32(),
			itemCatalogId2: reader.nextUInt32(),
			listings: Array(20)
				.fill(null)
				.map(() => {
					const chunk = reader.nextBuffer(52, true);
					return {
						salePrice: chunk.nextUInt32(),
						purchaseTime: chunk.nextUInt32(),
						quantity: chunk.nextUInt32(),
						isHq: Boolean(chunk.nextUInt8()),
						padding: chunk.nextUInt8(),
						onMannequin: Boolean(chunk.nextUInt8()),
						buyerName: chunk.nextString(0x20),
						itemCatalogId: chunk.nextUInt32(),
					};
				}),
		};
	}
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
