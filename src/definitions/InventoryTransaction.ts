export interface InventoryTransaction {
	unknown: number;
	flag: number;
	padding: number;
	containerId: number;
	slot: number;
	padding2: number;
	quantity: number;
	catalogId: number;
	someActorId: number;
	targetStorageId: number;
}
