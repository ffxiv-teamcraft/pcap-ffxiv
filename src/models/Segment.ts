import { DeucalionPacketHeader } from "./DeucalionPacket";

export interface Segment {
	header: DeucalionPacketHeader;
	data?: Buffer;
}
