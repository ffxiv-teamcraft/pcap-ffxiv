import { EventResume } from "../EventResume";

export interface ReductionResult extends EventResume {
	itemId: number;
	unknown: boolean;
	result: {
		itemId: number;
		itemHq: boolean;
		itemQuantity: number;
	}[];
}
