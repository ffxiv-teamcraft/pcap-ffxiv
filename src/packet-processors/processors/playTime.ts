import { BufferReader } from "../../buffer-reader";
import { PlayTime } from "../../definitions/PlayTime";

export function playTime(reader: BufferReader): PlayTime {
	const playtime = reader.nextUInt32();
	const days = (playtime / 1440) << 0;
	const hours = ((playtime - days * 1440) / 60) << 0;
	const minutes = (playtime - days * 1440 - hours * 60) << 0;
	return {
		playtime,
		days,
		hours,
		minutes,
	};
}
