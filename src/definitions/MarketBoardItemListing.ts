export interface MateriaEntry {
	materiaId: number;
	index: number;
}

export interface MarketBoardItemListing {
	listings: {
		listingId: BigInt;
		retainerId: BigInt;
		retainerOwnerId: BigInt;
		artisanId: BigInt;
		pricePerUnit: number;
		totalTax: number;
		quantity: number;
		itemId: number;
		lastReviewTime: number;
		containerId: number;
		slot: number;
		durability: number;
		spiritbond: number;
		/**
		 * auto materiaId = (i & 0xFF0) >> 4;
		 * auto index = i & 0xF;
		 * auto leftover = i >> 8;
		 */
		materia: [MateriaEntry, MateriaEntry, MateriaEntry, MateriaEntry, MateriaEntry];
		padding1: number;
		padding2: number;
		retainerName: string;
		playerName: string;
		hq: boolean;
		materiaCount: number;
		onMannequin: boolean;
		city: number;
		dyeId: number;
		padding3: number;
		padding4: number;
	}[];
}
