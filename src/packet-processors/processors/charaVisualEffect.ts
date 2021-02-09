import { BufferReader } from "../../BufferReader";
import { CharaVisualEffect } from "../../definitions";

export function charaVisualEffect(reader: BufferReader): CharaVisualEffect {
	return {
		id: reader.nextUInt32(),
		padding: reader.nextUInt32(),
	};
}
