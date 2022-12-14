import { EventResume } from "../../../definitions";
import { RetrieveMateriaOutcome, RetrieveMateriaResult } from "../../../definitions/event-resume/RetrieveMateriaResult";

export function retrieveMateriaResult(packet: EventResume): RetrieveMateriaResult {
	let outcome = RetrieveMateriaOutcome.Unknown;

	if (packet.scene == 1 && packet.params[0] == 25) {
		outcome = RetrieveMateriaOutcome.InventoryFull;
	} else if (packet.scene == 0) {
		if (packet.params[0] == 0) {
			outcome = RetrieveMateriaOutcome.Shattered;
		} else {
			outcome = RetrieveMateriaOutcome.Retrieved;
		}
	}

	return {
		...packet,
		outcome: outcome,
		itemId: packet.params[1] % 1000000,
		itemHq: packet.params[1] > 1000000,
		materiaId: packet.params[2],
	};
}
