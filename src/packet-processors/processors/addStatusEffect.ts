import { BufferReader } from "../../BufferReader";
import { AddStatusEffect } from "../../definitions";

export function addStatusEffect(reader: BufferReader): AddStatusEffect {
	return {
		effectId: reader.skip(0x1a).nextUInt16(),
	};
}
