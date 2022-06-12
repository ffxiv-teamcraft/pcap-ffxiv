import { Segment } from "./Segment";
import { SegmentHeader } from "./SegmentHeader";

export interface GenericMessage<T = any> extends Segment {
	header: SegmentHeader;
	opcode: number;
	type: string;
	subType?: string;
	parsedIpcData?: T;
	data?: Buffer;
}
