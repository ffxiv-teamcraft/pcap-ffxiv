import { BufferReader } from "../buffer-reader";
import { actorControl } from "./processors/actorControl";
import { currencyCrystalInfo } from "./processors/currencyCrystalInfo";
import { effectResult } from "./processors/effectResult";
import { eventPlay } from "./processors/eventPlay";
import { eventPlay4 } from "./processors/eventPlay4";
import { eventPlay32 } from "./processors/eventPlay32";
import { initZone } from "./processors/initZone";
import { inventoryTransaction } from "./processors/inventoryTransaction";
import { itemInfo } from "./processors/itemInfo";
import { marketBoardItemListingCount } from "./processors/marketBoardItemListingCount";
import { marketBoardItemListingHistory } from "./processors/marketBoardItemListingHistory";
import { marketBoardSearchResult } from "./processors/marketBoardSearchResult";
import { marketTaxRates } from "./processors/marketTaxRates";
import { playerSetup } from "./processors/playerSetup";
import { playerStats } from "./processors/playerStats";
import { prepareZoning } from "./processors/prepareZoning";
import { retainerInformation } from "./processors/retainerInformation";
import { updateClassInfo } from "./processors/updateClassInfo";
import { updateInventorySlot } from "./processors/updateInventorySlot";

export function loadPacketProcessors(): Record<string, (reader: BufferReader) => any> {
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
		updateInventorySlot,
	};
}
