import { BufferReader } from "../../buffer-reader";
import { PrepareZoning } from "../../definitions";

export function prepareZoning(reader: BufferReader): PrepareZoning {
	return {
		logMessage: reader.nextUInt32(),
		targetZone: reader.nextUInt16(),
		animation: reader.nextUInt16(),
		param4: reader.nextUInt8(),
		hideChar: reader.nextUInt8(),
		fadeOut: reader.nextUInt8(),
		param7: reader.nextUInt8(),
		fadeOutTime: reader.nextUInt8(),
		unknown: reader.nextUInt8(),
		padding: reader.nextUInt16(),
	};
}
