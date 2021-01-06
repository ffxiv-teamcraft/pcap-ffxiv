import { BufferReader } from "../../buffer-reader";
import { PersistentEffect } from "../../definitions/PersistentEffect";

export function persistentEffect(reader: BufferReader): PersistentEffect {
	return {
		actionId: reader.nextUInt16(),
		effectId: reader.nextUInt16(),
	};
}
