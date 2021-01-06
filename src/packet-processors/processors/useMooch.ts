import { BufferReader } from "../../buffer-reader";
import { UseMooch } from "../../definitions/UseMooch";

export function useMooch(reader: BufferReader): UseMooch {
	return {
		moochId: reader.skip(0x18).nextUInt32(),
	};
}
