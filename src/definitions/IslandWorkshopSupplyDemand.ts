export interface IslandWorkshopSupplyDemand {
	popularity: number;
	predictedPopularity: number;
	supplyDemand: {
		id: number;
		supply: number;
		demand: number;
	}[];
}
