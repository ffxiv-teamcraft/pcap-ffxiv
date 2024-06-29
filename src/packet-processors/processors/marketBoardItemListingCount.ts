import { MarketBoardItemListingCount } from "../../definitions";
import { BufferReader } from "../../BufferReader";

export function marketBoardItemListingCount(reader: BufferReader): MarketBoardItemListingCount {
	return {
		// Known values: default=0; rate limited=0x70000003
		status: reader.nextUInt32(),
		quantity: reader.nextUInt32(),
	};
}
