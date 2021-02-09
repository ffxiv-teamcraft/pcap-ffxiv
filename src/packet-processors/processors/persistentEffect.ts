import { BufferReader } from "../../BufferReader";
import { PersistentEffect } from "../../definitions";

export function persistentEffect(reader: BufferReader): PersistentEffect {
	return {
		actionId: reader.nextUInt16(),
		effectId: reader.nextUInt16(),
	};
}
