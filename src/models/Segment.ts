import { SegmentHeader } from "./SegmentHeader";

export interface Segment {
	header: SegmentHeader;
	data?: Buffer;
}
