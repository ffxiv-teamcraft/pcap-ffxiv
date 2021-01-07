import { BufferReader } from "../../BufferReader";
import { LogMessage } from "../../definitions/LogMessage";

export function logMessage(reader: BufferReader): LogMessage {
	return {
		character: reader.skip(0x10).nextString(0x20),
		message: reader.nextString(),
	};
}
