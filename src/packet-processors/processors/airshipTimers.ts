import { BufferReader } from "../../BufferReader";
import { AirshipTimers } from "../../definitions";

function getSector(value): number {
	return value === 128 ? -1 : value;
}

export function airshipTimers(buffer: BufferReader): AirshipTimers {
	return {
		timers: Array(4)
			.fill(null)
			.map(() => ({
				returnTime: buffer.nextUInt32(),
				airshipSpeed: buffer.nextUInt16(),
				name: buffer.nextString(20),

				padding1: buffer.nextInt16(),
				padding2: buffer.nextUInt8(),

				dest1: getSector(buffer.nextUInt8()),
				dest2: getSector(buffer.nextUInt8()),
				dest3: getSector(buffer.nextUInt8()),
				dest4: getSector(buffer.nextUInt8()),
				dest5: getSector(buffer.nextUInt8()),

				padding3: buffer.nextUInt16(),
			})),
	};
}
