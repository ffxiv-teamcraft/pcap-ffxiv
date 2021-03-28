import { BufferReader } from "../../BufferReader";
import { EventPlay32 } from "../../definitions";
import { eventPlayN } from "./eventPlayN";

export function eventPlay32(reader: BufferReader): EventPlay32 {
	return {
		...eventPlayN(reader),
	};
}
