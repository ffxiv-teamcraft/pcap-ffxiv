import { SegmentHeader } from "./SegmentHeader";

export interface Segment<T = unknown> {
	header: SegmentHeader;
	type: string;
	subType?: string;
	ipcData?: Buffer;
	parsedIpcData?: T;
}
