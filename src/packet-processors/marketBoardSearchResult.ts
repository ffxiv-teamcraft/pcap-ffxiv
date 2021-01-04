import { MarketBoardSearchResult } from "../definitions";

export function marketBoardSearchResult(buf: Buffer): MarketBoardSearchResult {
	const resultChunks: Buffer[] = [];
	for (let i = 0; i < 20; i++) {
		resultChunks.push(buf.slice(i * 8, i * 8 + 8));
	}

	const afterArray = 8 * 20;

	return {
		items: resultChunks.map((chunk) => {
			return {
				itemCatalogId: chunk.readUInt32LE(0x00),
				quantity: chunk.readUInt16LE(0x04),
				demand: chunk.readUInt16LE(0x06),
			};
		}),
		itemIndexEnd: buf.readUInt32LE(afterArray + 0x00),
		padding1: buf.readUInt32LE(afterArray + 0x04),
		itemIndexStart: buf.readUInt32LE(afterArray + 0x08),
		requestId: buf.readUInt32LE(afterArray + 0x0c),
	};
}
