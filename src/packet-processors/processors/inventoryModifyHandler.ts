import { BufferReader } from "../../buffer-reader";
import { InventoryModifyHandler } from "../../definitions/InventoryModifyHandler";
import { ConstantsList } from "../../models";

function inventoryOperation(action: number, offset: number): string {
	if (action === offset)
		return "discard";
	if (action === offset + 1)
		return "move";
	if (action === offset + 2)
		return "swap";
	if (action === offset + 5)
		return "merge";
	if (action === offset + 10 || action === offset + 3)
		return "split";
	return `unknown${action}`;
}

export function inventoryModifyHandler(reader: BufferReader, constants: ConstantsList): InventoryModifyHandler {
	return {
		sequence: reader.nextUInt32(),
		action: inventoryOperation(reader.nextUInt16(), constants.InventoryOperationBaseValue) as "discard" | "move" | "swap" | "merge" | "split",
		fromContainer: reader.skip(6).nextUInt16(),
		fromSlot: reader.skip(2).nextUInt8(),
		toContainer: reader.skip(15).nextUInt16(),
		toSlot: reader.skip(2).nextUInt8(),
		splitCount: reader.skip(3).nextUInt32(),
	};
}
