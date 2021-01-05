import { FrameHeader } from "./FrameHeader";
import { Segment } from "./Segment";

export interface Frame {
	header: FrameHeader;
	segments: Segment<any>[];
}
