import { EventResume } from "../EventResume";

export enum RetrieveMateriaOutcome {
	InventoryFull = "inventoryfull",
	Shattered = "shattered",
	Retrieved = "retrieved",

	Unknown = "unknown",
}

export interface RetrieveMateriaResult extends EventResume {
	outcome: RetrieveMateriaOutcome;

	itemId: number;
	itemHq: boolean;
	materiaId: number;
}
