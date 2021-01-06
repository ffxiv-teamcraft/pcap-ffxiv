import { BufferReader } from "../../buffer-reader";
import { EventPlay8 } from "../../definitions/EventPlay8";
import { eventPlayN } from "./eventPlayN";

export function eventPlay8(reader: BufferReader): EventPlay8 {
	return {
		...eventPlayN(reader),
		params: Array.from(new Uint32Array(reader.nextBuffer(8 * 4))),
	};
}
