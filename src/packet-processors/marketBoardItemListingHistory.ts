import { MarketBoardItemListingHistory } from "../definitions";

export function marketBoardItemListingHistory(buf: Buffer): MarketBoardItemListingHistory {
	const entriesRegion = buf.slice(0x08);

	const entriesChunks: Buffer[] = [];
	for (let i = 0; i < 20; i++) {
		entriesChunks.push(entriesRegion.slice(i * 52, i * 52 + 52));
	}

	return {
		itemCatalogId: buf.readUInt32LE(0x00),
		itemCatalogId2: buf.readUInt32LE(0x04),
		listings: entriesChunks.map((chunk) => {
			return {
				salePrice: chunk.readUInt32LE(0x00),
				purchaseTime: chunk.readUInt32LE(0x04),
				quantity: chunk.readUInt32LE(0x08),
				isHq: Boolean(chunk.readUInt8(0x0c)),
				padding: chunk.readUInt8(0x0d),
				onMannequin: Boolean(chunk.readUInt8(0x0e)),
				buyerName: chunk.toString("utf8", 0x0f, 0x2f),
				itemCatalogId: chunk.readUInt32LE(0x30),
			};
		}),
	};
}
