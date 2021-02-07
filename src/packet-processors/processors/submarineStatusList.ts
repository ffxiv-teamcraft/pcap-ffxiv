import { BufferReader } from "../../BufferReader";
import { SubmarineStatusList } from "../../definitions";

export function submarineStatusList(buffer: BufferReader): SubmarineStatusList {
	return {
		statusList: Array(4)
			.fill(null)
			.map(() => ({
				status: buffer.nextUInt16(),
				rank: buffer.nextUInt16(),
				birthdate: buffer.nextUInt32(),
				returnTime: buffer.nextUInt32(),
				currentExp: buffer.nextUInt32(),
				totalExpForNextRank: buffer.nextUInt32(),
				capacity: buffer.nextUInt16(),
				name: buffer.nextString(20),
				padding1: buffer.nextUInt16(),
				padding2: buffer.nextUInt16(),
				hull: buffer.nextUInt16(),
				stern: buffer.nextUInt16(),
				bow: buffer.nextUInt16(),
				bridge: buffer.nextUInt16(),
				dest1: buffer.nextUInt8(),
				dest2: buffer.nextUInt8(),
				dest3: buffer.nextUInt8(),
				dest4: buffer.nextUInt8(),
				dest5: buffer.nextUInt8(),
				padding3: buffer.nextUInt8(),
			})),
	};
}
