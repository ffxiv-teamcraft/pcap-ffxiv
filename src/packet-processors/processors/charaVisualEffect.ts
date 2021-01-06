import { BufferReader } from "../../buffer-reader";
import { CharaVisualEffect } from "../../definitions/CharaVisualEffect";

export function charaVisualEffect(reader: BufferReader): CharaVisualEffect {
	return {
		ID: reader.nextUInt32(),
		padding: reader.nextUInt32(),
	};
}
