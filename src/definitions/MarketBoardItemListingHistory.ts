export interface MarketBoardItemListingHistory {
	itemID: number;
	itemCatalogId: number;
	itemCatalogId2: number;

	listings: {
		salePrice: number;
		purchaseTime: number;
		quantity: number;
		hq: number;
		onMannequin: number;
		buyerName: string;
		itemCatalogId: number;
	}[];
}
