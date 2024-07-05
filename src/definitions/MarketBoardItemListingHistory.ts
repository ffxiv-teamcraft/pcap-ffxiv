export interface MarketBoardItemListingHistory {
	itemCatalogId: number;
	itemCatalogId2?: number;
	listings: {
		salePrice: number;
		purchaseTime: number;
		quantity: number;
		isHq: boolean;
		onMannequin: boolean;
		buyerName: string;
		padding: number;
		itemCatalogId?: number;
	}[];
}
