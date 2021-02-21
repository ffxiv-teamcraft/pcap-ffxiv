export interface MarketBoardPurchaseHandler {
	retainerId: bigint;
	listingId: bigint;
	itemId: number;
	quantity: number;
	pricePerUnit: number;
}
