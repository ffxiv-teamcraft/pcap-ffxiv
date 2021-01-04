export interface MarketBoardSearchResult {
	items: {
		itemCatalogID: number;
		quantity: number;
		demand: number;
	}[];
	itemIndexEnd: number;
	itemIndexStart: number;
	requestID: number;
}
