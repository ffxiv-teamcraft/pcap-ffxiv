import { BufferReader } from "../../buffer-reader";
import { CharaVisualEffect } from "../../definitions/CharaVisualEffect";

export function charaVisualEffect(reader: BufferReader): CharaVisualEffect {
	return {
		id: reader.nextUInt32(),
		padding: reader.nextUInt32(),
	};
}
