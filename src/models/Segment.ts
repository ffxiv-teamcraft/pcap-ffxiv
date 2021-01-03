import { IpcHeader } from "./IpcHeader";
import { SegmentHeader } from "./SegmentHeader";

export interface Segment {
	header: SegmentHeader;
	ipcHeader?: IpcHeader;
	ipcData?: Buffer;
}
