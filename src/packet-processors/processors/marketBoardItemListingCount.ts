import { MarketBoardItemListingCount } from "../../definitions";
import { BufferReader } from "../../BufferReader";

export function marketBoardItemListingCount(reader: BufferReader): MarketBoardItemListingCount {
	return {
		itemCatalogId: reader.nextUInt32(),
		unknown1: reader.nextUInt32(),
		requestId: reader.nextUInt16(),
		quantity: reader.nextUInt16(),
		unknown3: reader.nextUInt32(),
	};
}
