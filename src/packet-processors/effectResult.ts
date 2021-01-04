import { EffectResult } from "../definitions";

export function effectResult(buf: Buffer): EffectResult {
	const statusRegion = buf.slice(0x18);

	// We can't map a TypedArray into any type other than itself.
	const statusChunks: Buffer[] = [];
	for (let i = 0; i < 4; i++) {
		statusChunks.push(statusRegion.slice(i * 16, i * 16 + 16));
	}

	return {
		globalSequence: buf.readUInt32LE(0x00),
		actorId: buf.readUInt32LE(0x04),
		currentHp: buf.readUInt32LE(0x08),
		maxHp: buf.readUInt32LE(0x0c),
		currentMp: buf.readUInt16LE(0x10),
		unknown1: buf.readUInt8(0x12),
		classId: buf.readUInt8(0x13),
		shieldPercentage: buf.readUInt8(0x14),
		entryCount: buf.readUInt8(0x15),
		unknown2: buf.readUInt16LE(0x16),
		statusEntries: statusChunks.map((chunk) => {
			return {
				index: chunk.readInt8(0x00),
				unknown3: chunk.readInt8(0x01),
				id: chunk.readUInt16LE(0x02),
				param: chunk.readUInt16LE(0x04),
				unknown4: chunk.readUInt16LE(0x06),
				duration: chunk.readFloatLE(0x08),
				sourceActorId: chunk.readUInt32LE(0x0c),
			};
		}),
	};
}
