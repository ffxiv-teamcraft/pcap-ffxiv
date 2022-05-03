import { Segment } from "./Segment";

export interface GenericMessage<T = any> extends Segment {
	opcode: number;
	type: string;
	subType?: string;
	parsedIpcData?: T;
	data?: Buffer;
}
