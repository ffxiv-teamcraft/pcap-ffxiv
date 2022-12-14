import { Region } from "./Region";

export interface OpcodeList {
	region: Region;
	lists: {
		ServerZoneIpcType: {
			name: string;
			opcode: number | Array<number>;
		}[];
		ClientZoneIpcType: {
			name: string;
			opcode: number;
		}[];
		ServerLobbyIpcType: {
			name: string;
			opcode: number;
		}[];
		ClientLobbyIpcType: {
			name: string;
			opcode: number;
		}[];
		ServerChatIpcType: {
			name: string;
			opcode: number;
		}[];
		ClientChatIpcType: {
			name: string;
			opcode: number;
		}[];
	};
}
