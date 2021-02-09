import { BufferReader } from "../../BufferReader";
import { AirshipStatusList } from "../../definitions";

const SECTORS_DATA_LENGTH = 4;
const MASK = 0x1;

function getProgression(buffer: BufferReader) {
	const progression: boolean[] = [];
	for (let i = 0; i < SECTORS_DATA_LENGTH; i++) {
		const currentByte = buffer.nextUInt8();
		for (let j = 0; j < 8; j++) {
			const sector = !!((currentByte & (MASK << j)) >> j);
			progression.push(sector);
		}
	}
	return progression;
}

export function airshipStatusList(buffer: BufferReader): AirshipStatusList {
	return {
		unlockedAirshipCount: buffer.nextUInt8(),

		unknown0: buffer.nextUInt8(),
		unknown1: buffer.nextUInt8(),
		unknown2: buffer.nextUInt8(),

		statusList: Array(4)
			.fill(null)
			.map(() => ({
				birthdate: buffer.nextUInt32(),
				returnTime: buffer.nextUInt32(),
				status: buffer.nextUInt16(),
				rank: buffer.nextUInt16(),
				name: buffer.nextString(20),
				padding: buffer.nextUInt32(),
			})),

		unlockedSectors: getProgression(buffer),
		exploredSectors: getProgression(buffer),

		unknown3: buffer.nextUInt16(),
	};
}
