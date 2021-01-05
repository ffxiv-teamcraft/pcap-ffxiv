export interface IpcHeader {
	reserved: number;
	type: number;
	padding: number;
	serverId: number;
	timestamp: number;
	padding1: number;
}
