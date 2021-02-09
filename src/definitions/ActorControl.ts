import { SuperPacket } from "../models";

export interface ActorControl extends SuperPacket {
	padding: number;
	param1: number;
	param2: number;
	param3: number;
	param4: number;
	padding1: number;
}
