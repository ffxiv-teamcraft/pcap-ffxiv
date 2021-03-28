import { BufferReader } from "../../BufferReader";
import { EventPlay8 } from "../../definitions";
import { eventPlayN } from "./eventPlayN";

export function eventPlay8(reader: BufferReader): EventPlay8 {
	return {
		...eventPlayN(reader),
	};
}
