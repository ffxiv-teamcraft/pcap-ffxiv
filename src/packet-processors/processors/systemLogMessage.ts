import { BufferReader } from "../../BufferReader";
import { SystemLogMessage } from "../../definitions";

export function systemLogMessage(reader: BufferReader): SystemLogMessage {
	return {
		eventId: reader.nextUInt32(),
		param1: reader.nextUInt32(),
		// Links to ActionTimeline entry
		actionTimeline: reader.nextUInt32(),
		param3: reader.nextUInt32(),
	};
}
