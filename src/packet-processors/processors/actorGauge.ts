import { BufferReader } from "../../BufferReader";
import { ActorGauge } from "../../definitions/ActorGauge";

export function actorGauge(reader: BufferReader): ActorGauge {
	return {
		classJobId: reader.nextUInt8(),
		data: Array(15).map(() => reader.nextUInt8()),
	};
}
