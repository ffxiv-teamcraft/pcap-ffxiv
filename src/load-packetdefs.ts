import { actorControl } from "./packet-processors/actorControl";
import { currencyCrystalInfo } from "./packet-processors/currencyCrystalInfo";
import { effectResult } from "./packet-processors/effectResult";
import { eventPlay } from "./packet-processors/eventPlay";
import { eventPlay32 } from "./packet-processors/eventPlay32";
import { eventPlay4 } from "./packet-processors/eventPlay4";
import { initZone } from "./packet-processors/initZone";

export function loadPacketDefs(): { [key: string]: (buf: Buffer) => any } {
	return {
		actorControl,
		currencyCrystalInfo,
		effectResult,
		eventPlay,
		eventPlay4,
		eventPlay32,
		initZone,
	};
}
