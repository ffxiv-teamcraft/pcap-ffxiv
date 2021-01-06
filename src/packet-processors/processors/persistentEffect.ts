import { BufferReader } from "../../buffer-reader";
import { PersistentEffect } from "../../definitions/PersistentEffect";

export function persistentEffect(reader: BufferReader): PersistentEffect {
	return {
		actionID: reader.nextUInt16(),
		effectID: reader.nextUInt16(),
	};
}
