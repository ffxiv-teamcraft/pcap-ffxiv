export interface TcpFrame {
	source: number;
	destination: number;
	sequence: number;
	acknowledgment: number;
	dataOffset: number;
	flags: number;
	window: number;
	checksum: number;
	urgentPointer: number;
	options: Buffer;
	data: Buffer;
	raw: Buffer;
}
