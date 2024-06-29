export interface MarketBoardItemListingHistory {
	itemCatalogId: number;
	listings: {
		salePrice: number;
		purchaseTime: number;
		quantity: number;
		isHq: boolean;
		onMannequin: boolean;
		buyerName: string;
		padding: number;
	}[];
}
