export interface UpdateInventorySlot {
	sequence: number;
	unknown: number;
	containerId: number;
	slot: number;
	quantity: number;
	catalogId: number;
	reservedFlag: number;
	signatureId: BigInt;
	hqFlag: boolean;
	unknown2: number;
	condition: number;
	spiritBond: number;
	color: number;
	glamourCatalogId: number;
	materia: [number, number, number, number, number];
	materiaTiers: [number, number, number, number, number];
	padding: number;
	unknown10: number;
}
