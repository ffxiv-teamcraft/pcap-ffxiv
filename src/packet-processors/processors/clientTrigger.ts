import { BufferReader } from "../../BufferReader";
import { ClientTrigger } from "../../definitions/ClientTrigger";

export function clientTrigger(reader: BufferReader): ClientTrigger {
	return {
		commandId: reader.nextUInt16(),
		// Named differently than in Sapphire because we count normally
		param1: reader.nextUInt32(),
		param2: reader.nextUInt32(),
		param3: reader.nextUInt32(),
		param4: reader.nextUInt32(),
		param5: reader.nextUInt32(),
		param6: reader.nextUInt64(),
	};
}
