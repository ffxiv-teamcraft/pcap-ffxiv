import { Origin } from "./Origin";

export interface DeucalionPacket {
	origin: Origin;
	header: DeucalionPacketHeader;
	data: Buffer;
}

export interface DeucalionPacketHeader {
	sourceActor: number;
	targetActor: number;
	ipcTimestamp: bigint;
	reserved: number;
	type: number;
	padding: number;
	serverId: number;
	timestamp: number;
	padding1: number;
}
