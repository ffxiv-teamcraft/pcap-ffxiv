import { InventoryOperation } from "../models/InventoryOperation";

export interface InventoryModifyHandler {
	sequence: number;
	action: InventoryOperation;
	fromContainer: number;
	fromSlot: number;
	toContainer: number;
	toSlot: number;
	splitCount: number;
}
