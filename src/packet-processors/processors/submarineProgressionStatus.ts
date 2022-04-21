import { BufferReader } from "../../BufferReader";
import { SubmarineProgressionStatus } from "../../definitions";

const SECTORS_DATA_LENGTH = 15;
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

export function submarineProgressionStatus(buffer: BufferReader): SubmarineProgressionStatus {
	return {
		unlockedSubmarineCount: buffer.nextUInt8(),
		unlockedSectors: getProgression(buffer),
		exploredSectors: getProgression(buffer),
	};
}
