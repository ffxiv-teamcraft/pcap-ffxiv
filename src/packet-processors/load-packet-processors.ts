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
import { actorCast } from "./processors/actorCast";
import { actorControlSelf } from "./processors/actorControlSelf";
import { actorControlTarget } from "./processors/actorControlTarget";
import { actorFreeSpawn } from "./processors/actorFreeSpawn";
import { actorOwner } from "./processors/actorOwner";
import { actorMove } from "./processors/actorMove";
import { actorGauge } from "./processors/actorGauge";
import { actorSetPos } from "./processors/actorSetPos";
import { blackList } from "./processors/blackList";
import { cFAvailableContents } from "./processors/cFAvailableContents";
import { cFDutyInfo } from "./processors/cFDutyInfo";
import { cFRegisterDuty } from "./processors/cFRegisterDuty";
import { cFPlayerInNeed } from "./processors/cFPlayerInNeed";
import { clientTrigger } from "./processors/clientTrigger";
import { charaVisualEffect } from "./processors/charaVisualEffect";
import { desynthResult } from "./processors/desynthResult";
import { eorzeaTimeOffset } from "./processors/eorzeaTimeOffset";
import { equipDisplayFlags } from "./processors/equipDisplayFlags";
import { eventPlay8 } from "./processors/eventPlay8";
import { freeCompanyUpdateShortMessage } from "./processors/freeCompanyUpdateShortMessage";
import { inventoryModifyHandler } from "./processors/inventoryModifyHandler";
import { PacketProcessor } from "../models/PacketProcessor";
import { logMessage } from "./processors/logMessage";
import { mount } from "./processors/mount";
import { npcSpawn } from "./processors/npcSpawn";
import { objectSpawn } from "./processors/objectSpawn";
import { persistentEffect } from "./processors/persistentEffect";
import { playerSpawn } from "./processors/playerSpawn";
import { playTime } from "./processors/playTime";
import { reductionResult } from "./processors/reductionResult";
import { serverNotice } from "./processors/serverNotice";
import { someDirectorUnk4 } from "./processors/someDirectorUnk4";
import { statusEffectList } from "./processors/statusEffectList";
import { updateHpMpTp } from "./processors/updateHpMpTp";
import { updatePositionHandler } from "./processors/updatePositionHandler";
import { updatePositionInstance } from "./processors/updatePositionInstance";
import { useMooch } from "./processors/useMooch";
import { weatherChange } from "./processors/weatherChange";

export function loadPacketProcessors(): Record<string, PacketProcessor> {
	return {
		actorCast,
		actorControl,
		actorControlSelf,
		actorControlTarget,
		actorFreeSpawn,
		actorGauge,
		actorMove,
		actorOwner,
		actorSetPos,
		blackList,
		cFAvailableContents,
		cFDutyInfo,
		cFPlayerInNeed,
		cFRegisterDuty,
		charaVisualEffect,
		clientTrigger,
		currencyCrystalInfo,
		desynthResult,
		effectResult,
		eorzeaTimeOffset,
		equipDisplayFlags,
		eventPlay,
		eventPlay4,
		eventPlay8,
		eventPlay32,
		freeCompanyUpdateShortMessage,
		initZone,
		inventoryModifyHandler,
		inventoryTransaction,
		itemInfo,
		logMessage,
		marketBoardItemListingCount,
		marketBoardItemListingHistory,
		marketBoardSearchResult,
		marketTaxRates,
		mount,
		npcSpawn,
		objectSpawn,
		persistentEffect,
		playerSetup,
		playerSpawn,
		playerStats,
		playTime,
		prepareZoning,
		reductionResult,
		retainerInformation,
		serverNotice,
		someDirectorUnk4,
		statusEffectList,
		updateClassInfo,
		updateHpMpTp,
		updateInventorySlot,
		updatePositionHandler,
		updatePositionInstance,
		useMooch,
		weatherChange,
	};
}
