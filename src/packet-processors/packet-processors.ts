import { PacketProcessor } from "../models";
import { actorCast } from "./processors/actorCast";
import { actorControl } from "./processors/actorControl";
import { actorControlSelf } from "./processors/actorControlSelf";
import { actorControlTarget } from "./processors/actorControlTarget";
import { actorFreeSpawn } from "./processors/actorFreeSpawn";
import { actorGauge } from "./processors/actorGauge";
import { actorMove } from "./processors/actorMove";
import { actorOwner } from "./processors/actorOwner";
import { actorSetPos } from "./processors/actorSetPos";
import { addStatusEffect } from "./processors/addStatusEffect";
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
import { containerInfo } from "./processors/containerInfo";
import { craftingLog } from "./processors/craftingLog";
import { currencyCrystalInfo } from "./processors/currencyCrystalInfo";
import { effectResult } from "./processors/effectResult";
import { eorzeaTimeOffset } from "./processors/eorzeaTimeOffset";
import { equipDisplayFlags } from "./processors/equipDisplayFlags";
import { eventFinish } from "./processors/eventFinish";
import { eventPlay } from "./processors/eventPlay";
import { eventPlay32 } from "./processors/eventPlay32";
import { eventPlay4 } from "./processors/eventPlay4";
import { eventPlay8 } from "./processors/eventPlay8";
import { eventPlayN } from "./processors/eventPlayN";
import { eventResume } from "./processors/eventResume";
import { eventStart } from "./processors/eventStart";
import { freeCompanyDialog } from "./processors/freeCompanyDialog";
import { freeCompanyInfo } from "./processors/freeCompanyInfo";
import { freeCompanyUpdateShortMessage } from "./processors/freeCompanyUpdateShortMessage";
import { gatheringLog } from "./processors/gatheringLog";
import { initZone } from "./processors/initZone";
import { inventoryModifyHandler } from "./processors/inventoryModifyHandler";
import { inventoryTransaction } from "./processors/inventoryTransaction";
import { islandWorkshopSupplyDemand } from "./processors/islandWorkshopSupplyDemand";
import { itemInfo } from "./processors/itemInfo";
import { itemMarketBoardInfo } from "./processors/itemMarketBoardInfo";
import { logMessage } from "./processors/logMessage";
import { logout } from "./processors/logout";
import { marketBoardItemListing } from "./processors/marketBoardItemListing";
import { marketBoardItemListingCount } from "./processors/marketBoardItemListingCount";
import { marketBoardItemListingHistory } from "./processors/marketBoardItemListingHistory";
import { marketBoardPurchase } from "./processors/marketBoardPurchase";
import { marketBoardPurchaseHandler } from "./processors/marketBoardPurchaseHandler";
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
import { retainerInformation } from "./processors/retainerInformation";
import { serverNotice } from "./processors/serverNotice";
import { statusEffectList } from "./processors/statusEffectList";
import { submarineExplorationResult } from "./processors/submarineExplorationResult";
import { submarineProgressionStatus } from "./processors/submarineProgressionStatus";
import { submarineStatusList } from "./processors/submarineStatusList";
import { submarineTimers } from "./processors/submarineTimers";
import { systemLogMessage } from "./processors/systemLogMessage";
import { updateClassInfo } from "./processors/updateClassInfo";
import { updateHpMpTp } from "./processors/updateHpMpTp";
import { updateInventorySlot } from "./processors/updateInventorySlot";
import { updatePositionHandler } from "./processors/updatePositionHandler";
import { updatePositionInstance } from "./processors/updatePositionInstance";
import { weatherChange } from "./processors/weatherChange";

/**
* THIS IS A GENERATED FILE, DO NOT EDIT IT BY HAND.
*
* To update it, restart the build process.
*/

export const packetProcessors: Record<string, PacketProcessor> = { 
	actorCast,
	actorControl,
	actorControlSelf,
	actorControlTarget,
	actorFreeSpawn,
	actorGauge,
	actorMove,
	actorOwner,
	actorSetPos,
	addStatusEffect,
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
	containerInfo,
	craftingLog,
	currencyCrystalInfo,
	effectResult,
	eorzeaTimeOffset,
	equipDisplayFlags,
	eventFinish,
	eventPlay,
	eventPlay32,
	eventPlay4,
	eventPlay8,
	eventPlayN,
	eventResume,
	eventStart,
	freeCompanyDialog,
	freeCompanyInfo,
	freeCompanyUpdateShortMessage,
	gatheringLog,
	initZone,
	inventoryModifyHandler,
	inventoryTransaction,
	islandWorkshopSupplyDemand,
	itemInfo,
	itemMarketBoardInfo,
	logMessage,
	logout,
	marketBoardItemListing,
	marketBoardItemListingCount,
	marketBoardItemListingHistory,
	marketBoardPurchase,
	marketBoardPurchaseHandler,
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
	retainerInformation,
	serverNotice,
	statusEffectList,
	submarineExplorationResult,
	submarineProgressionStatus,
	submarineStatusList,
	submarineTimers,
	systemLogMessage,
	updateClassInfo,
	updateHpMpTp,
	updateInventorySlot,
	updatePositionHandler,
	updatePositionInstance,
	weatherChange, 
};
