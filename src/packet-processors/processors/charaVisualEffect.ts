import { BufferReader } from "../../buffer-reader";
import { CharaVisualEffect } from "../../definitions/CharaVisualEffect";

export function charaVisualEffect(reader: BufferReader): CharaVisualEffect {
	return {
		Id: reader.nextUInt32(),
		padding: reader.nextUInt32(),
	};
}
