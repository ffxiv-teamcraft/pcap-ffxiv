export interface MarketBoardSearchResult {
	items: {
		itemCatalogId: number;
		quantity: number;
		demand: number;
	}[];
	itemIndexEnd: number;
	padding1: number;
	itemIndexStart: number;
	requestId: number;
}
