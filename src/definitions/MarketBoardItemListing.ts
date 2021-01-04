export interface MarketBoardItemListing {
	listings: {
		listingId: BigInt;
		retainerId: BigInt;
		retainerOwnerId: BigInt;
		artisanId: BigInt;
		pricePerUnit: number;
		totalTax: number;
		quantity: number;
		lastReviewTime: number;
		containerId: number;
		slotId: number;
		durability: number;
		spiritbond: number;
		/**
		 * auto materiaId = (i & 0xFF0) >> 4;
		 * auto index = i & 0xF;
		 * auto leftover = i >> 8;
		 */
		materia: [number, number, number, number, number];
		padding1: number;
		padding2: number;
		retainerName: string;
		playerName: string;
		hq: boolean;
		materiaCount: number;
		onMannequin: number;
		city: StringConstructor;
		dyeId: number;
		padding3: number;
		padding4: number;
	}[];
	listingIndexEnd: number;
	listingIndexStart: number;
	requestId: number;
	padding7: string;
	unknown13: number;
	padding8: number;
	unknown14: number;
	padding9: BigInt;
	unknown15: number;
	padding10: number;
}
