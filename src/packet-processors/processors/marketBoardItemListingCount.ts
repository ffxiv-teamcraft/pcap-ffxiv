import { MarketBoardItemListingCount } from "../../definitions";
import { BufferReader } from "../../BufferReader";
import { ConstantsList, Region } from "../../models";

export function marketBoardItemListingCount(
	reader: BufferReader,
	constants: ConstantsList,
	region?: Region,
): MarketBoardItemListingCount {
	if (region === "KR") {
		return {
			itemCatalogId: reader.nextUInt32(),
			unknown1: reader.nextUInt32(),
			requestId: reader.nextUInt16(),
			unknown2: reader.nextUInt8(),
			quantity: reader.nextUInt16(),
		};
	}
	return {
		// Known values: default=0; rate limited=0x70000003
		status: reader.nextUInt32(),
		quantity: reader.nextUInt32(),
	};
}
