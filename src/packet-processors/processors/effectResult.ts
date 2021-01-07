import { EffectResult } from "../../definitions";
import { BufferReader } from "../../BufferReader";

export function effectResult(reader: BufferReader): EffectResult {
	return {
		globalSequence: reader.nextUInt32(),
		actorId: reader.nextUInt32(),
		currentHp: reader.nextUInt32(),
		maxHp: reader.nextUInt32(),
		currentMp: reader.nextUInt16(),
		unknown1: reader.nextUInt8(),
		classId: reader.nextUInt8(),
		shieldPercentage: reader.nextUInt8(),
		entryCount: reader.nextUInt8(),
		unknown2: reader.nextUInt16(),
		statusEntries: Array(4).map(() => {
			const chunkReader = reader.nextBuffer(16 + 16, true);
			return {
				index: chunkReader.nextInt8(),
				unknown3: chunkReader.nextInt8(),
				id: chunkReader.nextUInt16(),
				param: chunkReader.nextUInt16(),
				unknown4: chunkReader.nextUInt16(),
				duration: chunkReader.nextFloat(),
				sourceActorId: chunkReader.nextUInt32(),
			};
		}),
	};
}
