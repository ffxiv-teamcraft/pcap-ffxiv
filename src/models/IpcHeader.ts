export interface IpcHeader {
	reserved: number;
	type: number;
	serverId: number;
	timestamp: number;
}
