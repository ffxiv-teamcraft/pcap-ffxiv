import { PacketProcessor } from "../models/PacketProcessor";
import { actorCast } from "./processors/actorCast";
import { actorControl } from "./processors/actorControl";
import { actorControlSelf } from "./processors/actorControlSelf";
import { actorControlTarget } from "./processors/actorControlTarget";
import { actorFreeSpawn } from "./processors/actorFreeSpawn";
import { actorGauge } from "./processors/actorGauge";
import { actorMove } from "./processors/actorMove";
import { actorOwner } from "./processors/actorOwner";
import { actorSetPos } from "./processors/actorSetPos";
import { airshipExplorationResult } from "./processors/airshipExplorationResult";
import { airshipStatus } from "./processors/airshipStatus";
import { airshipStatusList } from "./processors/airshipStatusList";
import { airshipTimers } from "./processors/airshipTimers";
import { blackList } from "./processors/blackList";
import { cFAvailableContents } from "./processors/cFAvailableContents";
import { cFDutyInfo } from "./processors/cFDutyInfo";
import { cFPlayerInNeed } from "./processors/cFPlayerInNeed";
import { cFRegisterDuty } from "./processors/cFRegisterDuty";
import { charaVisualEffect } from "./processors/charaVisualEffect";
import { clientTrigger } from "./processors/clientTrigger";
import { currencyCrystalInfo } from "./processors/currencyCrystalInfo";
import { desynthResult } from "./processors/desynthResult";
import { effectResult } from "./processors/effectResult";
import { eorzeaTimeOffset } from "./processors/eorzeaTimeOffset";
import { equipDisplayFlags } from "./processors/equipDisplayFlags";
import { eventPlay } from "./processors/eventPlay";
import { eventPlay32 } from "./processors/eventPlay32";
import { eventPlay4 } from "./processors/eventPlay4";
import { eventPlay8 } from "./processors/eventPlay8";
import { eventPlayN } from "./processors/eventPlayN";
import { freeCompanyUpdateShortMessage } from "./processors/freeCompanyUpdateShortMessage";
import { initZone } from "./processors/initZone";
import { inventoryModifyHandler } from "./processors/inventoryModifyHandler";
import { inventoryTransaction } from "./processors/inventoryTransaction";
import { itemInfo } from "./processors/itemInfo";
import { logMessage } from "./processors/logMessage";
import { marketBoardItemListingCount } from "./processors/marketBoardItemListingCount";
import { marketBoardItemListingHistory } from "./processors/marketBoardItemListingHistory";
import { marketBoardSearchResult } from "./processors/marketBoardSearchResult";
import { mount } from "./processors/mount";
import { npcSpawn } from "./processors/npcSpawn";
import { objectSpawn } from "./processors/objectSpawn";
import { persistentEffect } from "./processors/persistentEffect";
import { playerSetup } from "./processors/playerSetup";
import { playerSpawn } from "./processors/playerSpawn";
import { playerStats } from "./processors/playerStats";
import { playTime } from "./processors/playTime";
import { prepareZoning } from "./processors/prepareZoning";
import { resultDialog } from "./processors/resultDialog";
import { retainerInformation } from "./processors/retainerInformation";
import { serverNotice } from "./processors/serverNotice";
import { someDirectorUnk4 } from "./processors/someDirectorUnk4";
import { statusEffectList } from "./processors/statusEffectList";
import { submarineExplorationResult } from "./processors/submarineExplorationResult";
import { submarineProgressionStatus } from "./processors/submarineProgressionStatus";
import { submarineStatusList } from "./processors/submarineStatusList";
import { submarineTimers } from "./processors/submarineTimers";
import { updateClassInfo } from "./processors/updateClassInfo";
import { updateHpMpTp } from "./processors/updateHpMpTp";
import { updateInventorySlot } from "./processors/updateInventorySlot";
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
		airshipExplorationResult,
		airshipStatus,
		airshipStatusList,
		airshipTimers,
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
		eventPlay32,
		eventPlay4,
		eventPlay8,
		eventPlayN,
		freeCompanyUpdateShortMessage,
		initZone,
		inventoryModifyHandler,
		inventoryTransaction,
		itemInfo,
		logMessage,
		marketBoardItemListingCount,
		marketBoardItemListingHistory,
		marketBoardSearchResult,
		mount,
		npcSpawn,
		objectSpawn,
		persistentEffect,
		playerSetup,
		playerSpawn,
		playerStats,
		playTime,
		prepareZoning,
		resultDialog,
		retainerInformation,
		serverNotice,
		someDirectorUnk4,
		statusEffectList,
		submarineExplorationResult,
		submarineProgressionStatus,
		submarineStatusList,
		submarineTimers,
		updateClassInfo,
		updateHpMpTp,
		updateInventorySlot,
		updatePositionHandler,
		updatePositionInstance,
		useMooch,
		weatherChange, 
	};
}
