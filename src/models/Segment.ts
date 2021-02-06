import { SegmentHeader } from "./SegmentHeader";

export interface Segment<T> {
	header: SegmentHeader;
	ipcData?: Buffer;
	parsedIpcData?: T;
}
