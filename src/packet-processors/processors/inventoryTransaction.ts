import { InventoryTransaction } from "../../definitions";
import { BufferReader } from "../../BufferReader";

export function inventoryTransaction(reader: BufferReader): InventoryTransaction {
	return {
		sequence: reader.nextUInt32(),
		type: reader.nextUInt16(),
		padding1: reader.nextUInt16(),
		ownerId: reader.nextUInt32(),
		containerId: reader.nextUInt32(),
		slotId: reader.nextUInt16(),
		padding2: reader.nextUInt16(),
		quantity: reader.nextUInt32(),
		catalogId: reader.nextUInt32(),
		someActorId: reader.nextUInt32(),
		targetStorageId: reader.nextInt32(),
		padding3: reader.nextUInt16(),
		padding4: reader.nextUInt8(),
	};
}
