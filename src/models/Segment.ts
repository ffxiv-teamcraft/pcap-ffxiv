import { IpcHeader } from "./IpcHeader";
import { SegmentHeader } from "./SegmentHeader";

export interface Segment<T> {
	header: SegmentHeader;
	ipcHeader?: IpcHeader;
	ipcData?: Buffer;
	parsedIpcData?: T;
}
