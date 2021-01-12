export interface TcpFrame {
	source: number;
	destination: number;
	sequence: number;
	acknowledgment: number;
	dataOffset: number;
	reserved: Buffer;
	flags: number;
	window: number;
	checksum: number;
	urgentPointer: number;
	options: Buffer;
	padding: number;
	data: Buffer;
	raw: Buffer;
}
