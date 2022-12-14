import { EventHandlerType } from "../models";
import { SuperPacket } from "../models/SuperPacket";

export interface EventResume extends SuperPacket {
	category: EventHandlerType;
	subcategory: number;
	scene: number;
	params: Array<number>;
}
