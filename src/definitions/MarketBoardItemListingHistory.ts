export interface MarketBoardItemListingHistory {
	itemCatalogId: number;
	itemCatalogId2: number;
	listings: {
		salePrice: number;
		purchaseTime: number;
		quantity: number;
		isHq: boolean;
		padding: number;
		onMannequin: boolean;
		buyerName: string;
		itemCatalogId: number;
	}[];
}
