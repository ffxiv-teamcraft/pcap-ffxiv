import { BufferReader } from "../../buffer-reader";
import { UseMooch } from "../../definitions/UseMooch";

export function useMooch(reader: BufferReader): UseMooch {
	return {
		moochID: reader.skip(0x18).nextUInt32(),
	};
}
