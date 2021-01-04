export interface InventoryModifyHandler {
	sequence: number;
	action: "discard" | "move" | "swap" | "merge" | "split";
	fromContainer: number;
	fromSlot: number;
	toContainer: number;
	toSlot: number;
	splitCount: number;
}
