import { BufferReader } from "../../BufferReader";
import { MarketBoardSearchResult } from "../../definitions";

export function marketBoardSearchResult(reader: BufferReader): MarketBoardSearchResult {
	return {
		items: Array(20)
			.fill(null)
			.map(() => {
				const chunk = reader.nextBuffer(8, true);
				return {
					itemCatalogId: chunk.nextUInt32(),
					quantity: chunk.nextUInt16(),
					demand: chunk.nextUInt16(),
				};
			}),
		itemIndexEnd: reader.nextUInt32(),
		padding1: reader.nextUInt32(),
		itemIndexStart: reader.nextUInt32(),
		requestId: reader.nextUInt32(),
	};
}
