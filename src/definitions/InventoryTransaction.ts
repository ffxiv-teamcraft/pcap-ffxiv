export interface InventoryTransaction {
	sequence: number;
	type: number;
	padding1: number;
	ownerId: number;
	containerId: number;
	slot: number;
	padding2: number;
	quantity: number;
	catalogId: number;
	someActorId: number;
	targetStorageId: number;
	padding3: number;
	padding4: number;
}
