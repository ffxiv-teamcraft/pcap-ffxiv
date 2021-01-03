import { ConnectionType } from "./ConnectionType";

export interface FrameHeader {
	magic1: BigInt;
	magic2: BigInt;
	timestamp: BigInt;
	size: number;
	connectionType: ConnectionType;
	segmentCount: number;
	unknown20: number;
	isCompressed: boolean;
	unknown24: number;
}
