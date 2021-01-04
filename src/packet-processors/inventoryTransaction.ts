import { InventoryTransaction } from "../definitions";

export function inventoryTransaction(buf: Buffer): InventoryTransaction {
	return {
		sequence: buf.readUInt32LE(0x00),
		type: buf.readUInt16LE(0x04),
		padding1: buf.readUInt16LE(0x06),
		ownerId: buf.readUInt32LE(0x08),
		containerId: buf.readUInt32LE(0x0c),
		slotId: buf.readUInt16LE(0x10),
		padding2: buf.readUInt16LE(0x12),
		quantity: buf.readUInt32LE(0x14),
		catalogId: buf.readUInt32LE(0x18),
		someActorId: buf.readUInt32LE(0x1c),
		targetStorageId: buf.readInt32LE(0x20),
		padding3: buf.readUInt16LE(0x24),
		padding4: buf.readUInt8(0x26),
	};
}
