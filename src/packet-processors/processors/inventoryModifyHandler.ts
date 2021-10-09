import { BufferReader } from "../../BufferReader";
import { InventoryModifyHandler } from "../../definitions";
import { ConstantsList } from "../../models";
import { InventoryOperation } from "../../models/InventoryOperation";

function inventoryOperation(action: number, offset: number): InventoryOperation | string {
	const value = action - offset;
	switch (value) {
		case 0:
			return "discard";
		case 1:
			return "move";
		case 2:
			return "swap";
		case 4:
			return "transferCrystal";
		case 5:
			return "merge";
		case 3:
		case 10:
			return "split";
		case 15:
			return "transferItemPlayerRetainer";
		case 16:
			return "transferItemRetainerPlayer";
		case 18:
			return "transferGil";
	}
	return `unknown${action}`;
}

export function inventoryModifyHandler(reader: BufferReader, constants: ConstantsList): InventoryModifyHandler {
	return {
		sequence: reader.nextUInt32(),
		action: inventoryOperation(reader.nextUInt16(), constants.InventoryOperationBaseValue) as InventoryOperation,
		fromContainer: reader.skip(6).nextUInt16(),
		fromSlot: reader.skip(2).nextUInt8(),
		toContainer: reader.skip(15).nextUInt16(),
		toSlot: reader.skip(2).nextUInt8(),
		splitCount: reader.skip(3).nextUInt32(),
	};
}
