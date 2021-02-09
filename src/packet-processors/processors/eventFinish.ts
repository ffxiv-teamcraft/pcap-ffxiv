import { BufferReader } from "../../BufferReader";
import { EventFinish } from "../../definitions";

export function eventFinish(reader: BufferReader): EventFinish {
	return {
		eventId: reader.nextUInt32(),
	};
}
