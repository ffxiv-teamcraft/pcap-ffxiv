import { actorControl } from "./packet-processors/actorControl";
import { currencyCrystalInfo } from "./packet-processors/currencyCrystalInfo";
import { effectResult } from "./packet-processors/effectResult";
import { eventPlay } from "./packet-processors/eventPlay";
import { eventPlay32 } from "./packet-processors/eventPlay32";
import { eventPlay4 } from "./packet-processors/eventPlay4";
import { initZone } from "./packet-processors/initZone";
import { inventoryTransaction } from "./packet-processors/inventoryTransaction";
import { itemInfo } from "./packet-processors/itemInfo";
import { marketBoardItemListingCount } from "./packet-processors/marketBoardItemListingCount";
import { marketBoardItemListingHistory } from "./packet-processors/marketBoardItemListingHistory";
import { marketBoardSearchResult } from "./packet-processors/marketBoardSearchResult";
import { marketTaxRates } from "./packet-processors/marketTaxRates";
import { playerSetup } from "./packet-processors/playerSetup";
import { playerStats } from "./packet-processors/playerStats";
import { prepareZoning } from "./packet-processors/prepareZoning";
import { retainerInformation } from "./packet-processors/retainerInformation";
import { updateClassInfo } from "./packet-processors/updateClassInfo";

export function loadPacketDefs(): { [key: string]: (buf: Buffer) => any } {
	return {
		actorControl,
		currencyCrystalInfo,
		effectResult,
		eventPlay,
		eventPlay4,
		eventPlay32,
		initZone,
		inventoryTransaction,
		itemInfo,
		marketBoardItemListingCount,
		marketBoardItemListingHistory,
		marketBoardSearchResult,
		marketTaxRates,
		playerSetup,
		playerStats,
		prepareZoning,
		retainerInformation,
		updateClassInfo,
	};
}
