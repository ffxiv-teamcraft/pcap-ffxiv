import { BufferReader } from "../../BufferReader";
import { EventStart } from "../../definitions";

export function eventStart(reader: BufferReader): EventStart {
	return {
		actorId: reader.nextUInt64(),
		eventId: reader.nextUInt32(),
	};
}
