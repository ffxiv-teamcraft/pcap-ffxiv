import { BufferReader } from "../../BufferReader";
import { EventPlay4 } from "../../definitions";
import { eventPlayN } from "./eventPlayN";

export function eventPlay4(reader: BufferReader): EventPlay4 {
	return {
		...eventPlayN(reader),
		params: Array.from(new Uint32Array(reader.nextBuffer(4 * 4))),
	};
}
