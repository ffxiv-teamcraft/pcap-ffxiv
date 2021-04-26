import { MarketBoardItemListingCount } from "../../definitions";
import { BufferReader } from "../../BufferReader";

export function marketBoardItemListingCount(reader: BufferReader): MarketBoardItemListingCount {
	return {
		itemCatalogId: reader.nextUInt32(),
		unknown1: reader.nextUInt32(),
		requestId: reader.nextUInt16(),
		unknown2: reader.nextUInt8(),
		quantity: reader.nextUInt8(),
		unknown3: reader.nextUInt32(),
	};
}
