import { EventResume } from "../EventResume";

export interface DesynthResult extends EventResume {
	itemId: number;
	itemHq: boolean;
	result: {
		itemId: number;
		itemHq: boolean;
		itemQuantity: number;
	}[];
	unknown: boolean;
	unknown2: number; // TODO: Gather data, probably ClassJobId for skill up
	unknown3: number; // TODO: Gather data, probably experience gained
}
