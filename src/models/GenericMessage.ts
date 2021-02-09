import { Segment } from "./Segment";

export interface GenericMessage<T = any> extends Segment {
	type: string;
	subType?: string;
	parsedIpcData?: T;
}
