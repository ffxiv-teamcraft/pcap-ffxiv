import { BufferReader } from "../../BufferReader";
import { AirshipStatus } from "../../definitions/AirshipStatus";

const SECTORS_DATA_LENGTH = 4;
const MASK = 0x1;

function getSector(value): number {
	return value === 128 ? -1 : value;
}

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

export function airshipStatus(buffer: BufferReader): AirshipStatus {
	return {
		returnTime: buffer.nextUInt32(),
		status: buffer.nextUInt16(),
		rank: buffer.nextUInt16(),
		capacity: buffer.nextUInt16(),

		unknown0: buffer.nextUInt16(),

		currentExp: buffer.nextUInt32(),
		totalExpForNextRank: buffer.nextUInt32(),
		unlockedAirshipCount: buffer.nextUInt16(),
		hull: buffer.nextUInt16(),
		rigging: buffer.nextUInt16(),
		forecastle: buffer.nextUInt16(),
		aftcastle: buffer.nextUInt16(),
		dest1: getSector(buffer.nextUInt8()),
		dest2: getSector(buffer.nextUInt8()),
		dest3: getSector(buffer.nextUInt8()),
		dest4: getSector(buffer.nextUInt8()),
		dest5: getSector(buffer.nextUInt8()),
		name: buffer.nextString(20),

		padding1: buffer.nextUInt8(),
		padding2: buffer.nextUInt16(),

		unlockedSectors: getProgression(buffer),
		exploredSectors: getProgression(buffer),

		unknown1: buffer.nextUInt16(),
		unknown2: buffer.nextUInt32(),
	};
}