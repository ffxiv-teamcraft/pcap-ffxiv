import { MarketBoardItemListingCount } from "../definitions";

export function marketBoardItemListingCount(buf: Buffer): MarketBoardItemListingCount {
	return {
		itemCatalogId: buf.readUInt32LE(0x00),
		unknown1: buf.readUInt32LE(0x04),
		requestId: buf.readUInt16LE(0x08),
		quantity: buf.readUInt16LE(0x0a),
		unknown3: buf.readUInt32LE(0x0c),
	};
}
