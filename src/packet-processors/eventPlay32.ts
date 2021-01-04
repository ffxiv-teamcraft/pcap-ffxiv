import { EventPlay32 } from "../definitions";
import { eventPlayN } from "./eventPlayN";

export function eventPlay32(buf: Buffer): EventPlay32 {
	return {
		...eventPlayN(buf),
		params: Array.from(new Uint32Array(buf.slice(0x24, 0x24 + 4 * 32))),
	};
}
