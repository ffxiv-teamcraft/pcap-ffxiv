import { Segment } from "./Segment";
import { DeucalionPacketHeader } from "./DeucalionPacket";

export interface GenericMessage<T = any> extends Segment {
	origin: 'C' | 'S';
	header: DeucalionPacketHeader;
	opcode: number;
	type: string;
	subType?: string;
	parsedIpcData?: T;
	data?: Buffer;
}
