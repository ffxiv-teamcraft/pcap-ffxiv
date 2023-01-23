import { GenericMessage } from "./GenericMessage";
import { ActorCast } from "../definitions";
import { ActorControl } from "../definitions";
import { ActorControlSelf } from "../definitions";
import { ActorControlTarget } from "../definitions";
import { ActorFreeSpawn } from "../definitions";
import { ActorGauge } from "../definitions";
import { ActorMove } from "../definitions";
import { ActorOwner } from "../definitions";
import { ActorSetPos } from "../definitions";
import { AddStatusEffect } from "../definitions";
import { AirshipExplorationResult } from "../definitions";
import { AirshipStatus } from "../definitions";
import { AirshipStatusList } from "../definitions";
import { AirshipTimers } from "../definitions";
import { BlackList } from "../definitions";
import { CFAvailableContents } from "../definitions";
import { CFDutyInfo } from "../definitions";
import { CFPlayerInNeed } from "../definitions";
import { CFRegisterDuty } from "../definitions";
import { CharaVisualEffect } from "../definitions";
import { ClientTrigger } from "../definitions";
import { ContainerInfo } from "../definitions";
import { CraftingLog } from "../definitions";
import { CurrencyCrystalInfo } from "../definitions";
import { DesynthResult } from "../definitions";
import { EffectResult } from "../definitions";
import { EorzeaTimeOffset } from "../definitions";
import { EquipDisplayFlags } from "../definitions";
import { EventFinish } from "../definitions";
import { EventPlay } from "../definitions";
import { EventPlay32 } from "../definitions";
import { EventPlay4 } from "../definitions";
import { EventPlay64 } from "../definitions";
import { EventPlay8 } from "../definitions";
import { EventPlayN } from "../definitions";
import { EventStart } from "../definitions";
import { FreeCompanyDialog } from "../definitions";
import { FreeCompanyInfo } from "../definitions";
import { FreeCompanyUpdateShortMessage } from "../definitions";
import { GatheringLog } from "../definitions";
import { InitZone } from "../definitions";
import { InventoryModifyHandler } from "../definitions";
import { InventoryTransaction } from "../definitions";
import { IslandWorkshopSupplyDemand } from "../definitions";
import { ItemInfo } from "../definitions";
import { ItemMarketBoardInfo } from "../definitions";
import { LogMessage } from "../definitions";
import { Logout } from "../definitions";
import { MarketBoardItemListing } from "../definitions";
import { MarketBoardItemListingCount } from "../definitions";
import { MarketBoardItemListingHistory } from "../definitions";
import { MarketBoardPurchase } from "../definitions";
import { MarketBoardPurchaseHandler } from "../definitions";
import { MarketBoardSearchResult } from "../definitions";
import { Mount } from "../definitions";
import { NpcSpawn } from "../definitions";
import { ObjectSpawn } from "../definitions";
import { PersistentEffect } from "../definitions";
import { PlayerSetup } from "../definitions";
import { PlayerSpawn } from "../definitions";
import { PlayerStats } from "../definitions";
import { PlayTime } from "../definitions";
import { PrepareZoning } from "../definitions";
import { ResultDialog } from "../definitions";
import { RetainerInformation } from "../definitions";
import { ServerNotice } from "../definitions";
import { StatusEffectList } from "../definitions";
import { SubmarineExplorationResult } from "../definitions";
import { SubmarineProgressionStatus } from "../definitions";
import { SubmarineStatusList } from "../definitions";
import { SubmarineTimers } from "../definitions";
import { SystemLogMessage } from "../definitions";
import { UpdateClassInfo } from "../definitions";
import { UpdateHpMpTp } from "../definitions";
import { UpdateInventorySlot } from "../definitions";
import { UpdatePositionHandler } from "../definitions";
import { UpdatePositionInstance } from "../definitions";
import { WeatherChange } from "../definitions";
import { ActionStart } from "../definitions";
import { AutoAttack } from "../definitions";
import { DailyQuestSeed } from "../definitions";
import { EObjSetState } from "../definitions";
import { FishingBaitMsg } from "../definitions";
import { SetMountSpeed } from "../definitions";
import { StatusEffectLose } from "../definitions";
import { ToggleWeapon } from "../definitions";
import { UpdateRestedExp } from "../definitions";
import { MarketTaxRates } from "../definitions";
import { ReductionResult } from "../definitions";

/**
* THIS IS A GENERATED FILE, DO NOT EDIT IT BY HAND.
*
* To update it, restart the build process.
*/
export interface ActorCastMessage extends GenericMessage<ActorCast> {
	type: "actorCast";
}

export interface ActorControlMessage extends GenericMessage<ActorControl> {
	type: "actorControl";
}

export interface ActorControlSelfMessage extends GenericMessage<ActorControlSelf> {
	type: "actorControlSelf";
}

export interface ActorControlTargetMessage extends GenericMessage<ActorControlTarget> {
	type: "actorControlTarget";
}

export interface ActorFreeSpawnMessage extends GenericMessage<ActorFreeSpawn> {
	type: "actorFreeSpawn";
}

export interface ActorGaugeMessage extends GenericMessage<ActorGauge> {
	type: "actorGauge";
}

export interface ActorMoveMessage extends GenericMessage<ActorMove> {
	type: "actorMove";
}

export interface ActorOwnerMessage extends GenericMessage<ActorOwner> {
	type: "actorOwner";
}

export interface ActorSetPosMessage extends GenericMessage<ActorSetPos> {
	type: "actorSetPos";
}

export interface AddStatusEffectMessage extends GenericMessage<AddStatusEffect> {
	type: "addStatusEffect";
}

export interface AirshipExplorationResultMessage extends GenericMessage<AirshipExplorationResult> {
	type: "airshipExplorationResult";
}

export interface AirshipStatusMessage extends GenericMessage<AirshipStatus> {
	type: "airshipStatus";
}

export interface AirshipStatusListMessage extends GenericMessage<AirshipStatusList> {
	type: "airshipStatusList";
}

export interface AirshipTimersMessage extends GenericMessage<AirshipTimers> {
	type: "airshipTimers";
}

export interface BlackListMessage extends GenericMessage<BlackList> {
	type: "blackList";
}

export interface CFAvailableContentsMessage extends GenericMessage<CFAvailableContents> {
	type: "cFAvailableContents";
}

export interface CFDutyInfoMessage extends GenericMessage<CFDutyInfo> {
	type: "cFDutyInfo";
}

export interface CFPlayerInNeedMessage extends GenericMessage<CFPlayerInNeed> {
	type: "cFPlayerInNeed";
}

export interface CFRegisterDutyMessage extends GenericMessage<CFRegisterDuty> {
	type: "cFRegisterDuty";
}

export interface CharaVisualEffectMessage extends GenericMessage<CharaVisualEffect> {
	type: "charaVisualEffect";
}

export interface ClientTriggerMessage extends GenericMessage<ClientTrigger> {
	type: "clientTrigger";
}

export interface ContainerInfoMessage extends GenericMessage<ContainerInfo> {
	type: "containerInfo";
}

export interface CraftingLogMessage extends GenericMessage<CraftingLog> {
	type: "craftingLog";
}

export interface CurrencyCrystalInfoMessage extends GenericMessage<CurrencyCrystalInfo> {
	type: "currencyCrystalInfo";
}

export interface DesynthResultMessage extends GenericMessage<DesynthResult> {
	type: "desynthResult";
}

export interface EffectResultMessage extends GenericMessage<EffectResult> {
	type: "effectResult";
}

export interface EorzeaTimeOffsetMessage extends GenericMessage<EorzeaTimeOffset> {
	type: "eorzeaTimeOffset";
}

export interface EquipDisplayFlagsMessage extends GenericMessage<EquipDisplayFlags> {
	type: "equipDisplayFlags";
}

export interface EventFinishMessage extends GenericMessage<EventFinish> {
	type: "eventFinish";
}

export interface EventPlayMessage extends GenericMessage<EventPlay> {
	type: "eventPlay";
}

export interface EventPlay32Message extends GenericMessage<EventPlay32> {
	type: "eventPlay32";
}

export interface EventPlay4Message extends GenericMessage<EventPlay4> {
	type: "eventPlay4";
}

export interface EventPlay64Message extends GenericMessage<EventPlay64> {
	type: "eventPlay64";
}

export interface EventPlay8Message extends GenericMessage<EventPlay8> {
	type: "eventPlay8";
}

export interface EventPlayNMessage extends GenericMessage<EventPlayN> {
	type: "eventPlayN";
}

export interface EventStartMessage extends GenericMessage<EventStart> {
	type: "eventStart";
}

export interface FreeCompanyDialogMessage extends GenericMessage<FreeCompanyDialog> {
	type: "freeCompanyDialog";
}

export interface FreeCompanyInfoMessage extends GenericMessage<FreeCompanyInfo> {
	type: "freeCompanyInfo";
}

export interface FreeCompanyUpdateShortMessageMessage extends GenericMessage<FreeCompanyUpdateShortMessage> {
	type: "freeCompanyUpdateShortMessage";
}

export interface GatheringLogMessage extends GenericMessage<GatheringLog> {
	type: "gatheringLog";
}

export interface InitZoneMessage extends GenericMessage<InitZone> {
	type: "initZone";
}

export interface InventoryModifyHandlerMessage extends GenericMessage<InventoryModifyHandler> {
	type: "inventoryModifyHandler";
}

export interface InventoryTransactionMessage extends GenericMessage<InventoryTransaction> {
	type: "inventoryTransaction";
}

export interface IslandWorkshopSupplyDemandMessage extends GenericMessage<IslandWorkshopSupplyDemand> {
	type: "islandWorkshopSupplyDemand";
}

export interface ItemInfoMessage extends GenericMessage<ItemInfo> {
	type: "itemInfo";
}

export interface ItemMarketBoardInfoMessage extends GenericMessage<ItemMarketBoardInfo> {
	type: "itemMarketBoardInfo";
}

export interface LogMessageMessage extends GenericMessage<LogMessage> {
	type: "logMessage";
}

export interface LogoutMessage extends GenericMessage<Logout> {
	type: "logout";
}

export interface MarketBoardItemListingMessage extends GenericMessage<MarketBoardItemListing> {
	type: "marketBoardItemListing";
}

export interface MarketBoardItemListingCountMessage extends GenericMessage<MarketBoardItemListingCount> {
	type: "marketBoardItemListingCount";
}

export interface MarketBoardItemListingHistoryMessage extends GenericMessage<MarketBoardItemListingHistory> {
	type: "marketBoardItemListingHistory";
}

export interface MarketBoardPurchaseMessage extends GenericMessage<MarketBoardPurchase> {
	type: "marketBoardPurchase";
}

export interface MarketBoardPurchaseHandlerMessage extends GenericMessage<MarketBoardPurchaseHandler> {
	type: "marketBoardPurchaseHandler";
}

export interface MarketBoardSearchResultMessage extends GenericMessage<MarketBoardSearchResult> {
	type: "marketBoardSearchResult";
}

export interface MountMessage extends GenericMessage<Mount> {
	type: "mount";
}

export interface NpcSpawnMessage extends GenericMessage<NpcSpawn> {
	type: "npcSpawn";
}

export interface ObjectSpawnMessage extends GenericMessage<ObjectSpawn> {
	type: "objectSpawn";
}

export interface PersistentEffectMessage extends GenericMessage<PersistentEffect> {
	type: "persistentEffect";
}

export interface PlayerSetupMessage extends GenericMessage<PlayerSetup> {
	type: "playerSetup";
}

export interface PlayerSpawnMessage extends GenericMessage<PlayerSpawn> {
	type: "playerSpawn";
}

export interface PlayerStatsMessage extends GenericMessage<PlayerStats> {
	type: "playerStats";
}

export interface PlayTimeMessage extends GenericMessage<PlayTime> {
	type: "playTime";
}

export interface PrepareZoningMessage extends GenericMessage<PrepareZoning> {
	type: "prepareZoning";
}

export interface ResultDialogMessage extends GenericMessage<ResultDialog> {
	type: "resultDialog";
}

export interface RetainerInformationMessage extends GenericMessage<RetainerInformation> {
	type: "retainerInformation";
}

export interface ServerNoticeMessage extends GenericMessage<ServerNotice> {
	type: "serverNotice";
}

export interface StatusEffectListMessage extends GenericMessage<StatusEffectList> {
	type: "statusEffectList";
}

export interface SubmarineExplorationResultMessage extends GenericMessage<SubmarineExplorationResult> {
	type: "submarineExplorationResult";
}

export interface SubmarineProgressionStatusMessage extends GenericMessage<SubmarineProgressionStatus> {
	type: "submarineProgressionStatus";
}

export interface SubmarineStatusListMessage extends GenericMessage<SubmarineStatusList> {
	type: "submarineStatusList";
}

export interface SubmarineTimersMessage extends GenericMessage<SubmarineTimers> {
	type: "submarineTimers";
}

export interface SystemLogMessageMessage extends GenericMessage<SystemLogMessage> {
	type: "systemLogMessage";
}

export interface UpdateClassInfoMessage extends GenericMessage<UpdateClassInfo> {
	type: "updateClassInfo";
}

export interface UpdateHpMpTpMessage extends GenericMessage<UpdateHpMpTp> {
	type: "updateHpMpTp";
}

export interface UpdateInventorySlotMessage extends GenericMessage<UpdateInventorySlot> {
	type: "updateInventorySlot";
}

export interface UpdatePositionHandlerMessage extends GenericMessage<UpdatePositionHandler> {
	type: "updatePositionHandler";
}

export interface UpdatePositionInstanceMessage extends GenericMessage<UpdatePositionInstance> {
	type: "updatePositionInstance";
}

export interface WeatherChangeMessage extends GenericMessage<WeatherChange> {
	type: "weatherChange";
}

export interface ActorControlActionStartMessage extends GenericMessage<ActionStart> {
	type: "actorControl";
	subType: "actionStart";
}

export interface ActorControlAutoAttackMessage extends GenericMessage<AutoAttack> {
	type: "actorControl";
	subType: "autoAttack";
}

export interface ActorControlDailyQuestSeedMessage extends GenericMessage<DailyQuestSeed> {
	type: "actorControl";
	subType: "dailyQuestSeed";
}

export interface ActorControlEObjSetStateMessage extends GenericMessage<EObjSetState> {
	type: "actorControl";
	subType: "eObjSetState";
}

export interface ActorControlFishingBaitMsgMessage extends GenericMessage<FishingBaitMsg> {
	type: "actorControl";
	subType: "fishingBaitMsg";
}

export interface ActorControlSetMountSpeedMessage extends GenericMessage<SetMountSpeed> {
	type: "actorControl";
	subType: "setMountSpeed";
}

export interface ActorControlStatusEffectLoseMessage extends GenericMessage<StatusEffectLose> {
	type: "actorControl";
	subType: "statusEffectLose";
}

export interface ActorControlToggleWeaponMessage extends GenericMessage<ToggleWeapon> {
	type: "actorControl";
	subType: "toggleWeapon";
}

export interface ActorControlUpdateRestedExpMessage extends GenericMessage<UpdateRestedExp> {
	type: "actorControl";
	subType: "updateRestedExp";
}

export interface ActorControlSelfActionStartMessage extends GenericMessage<ActionStart> {
	type: "actorControlSelf";
	subType: "actionStart";
}

export interface ActorControlSelfAutoAttackMessage extends GenericMessage<AutoAttack> {
	type: "actorControlSelf";
	subType: "autoAttack";
}

export interface ActorControlSelfDailyQuestSeedMessage extends GenericMessage<DailyQuestSeed> {
	type: "actorControlSelf";
	subType: "dailyQuestSeed";
}

export interface ActorControlSelfEObjSetStateMessage extends GenericMessage<EObjSetState> {
	type: "actorControlSelf";
	subType: "eObjSetState";
}

export interface ActorControlSelfFishingBaitMsgMessage extends GenericMessage<FishingBaitMsg> {
	type: "actorControlSelf";
	subType: "fishingBaitMsg";
}

export interface ActorControlSelfSetMountSpeedMessage extends GenericMessage<SetMountSpeed> {
	type: "actorControlSelf";
	subType: "setMountSpeed";
}

export interface ActorControlSelfStatusEffectLoseMessage extends GenericMessage<StatusEffectLose> {
	type: "actorControlSelf";
	subType: "statusEffectLose";
}

export interface ActorControlSelfToggleWeaponMessage extends GenericMessage<ToggleWeapon> {
	type: "actorControlSelf";
	subType: "toggleWeapon";
}

export interface ActorControlSelfUpdateRestedExpMessage extends GenericMessage<UpdateRestedExp> {
	type: "actorControlSelf";
	subType: "updateRestedExp";
}

export interface ActorControlTargetActionStartMessage extends GenericMessage<ActionStart> {
	type: "actorControlTarget";
	subType: "actionStart";
}

export interface ActorControlTargetAutoAttackMessage extends GenericMessage<AutoAttack> {
	type: "actorControlTarget";
	subType: "autoAttack";
}

export interface ActorControlTargetDailyQuestSeedMessage extends GenericMessage<DailyQuestSeed> {
	type: "actorControlTarget";
	subType: "dailyQuestSeed";
}

export interface ActorControlTargetEObjSetStateMessage extends GenericMessage<EObjSetState> {
	type: "actorControlTarget";
	subType: "eObjSetState";
}

export interface ActorControlTargetFishingBaitMsgMessage extends GenericMessage<FishingBaitMsg> {
	type: "actorControlTarget";
	subType: "fishingBaitMsg";
}

export interface ActorControlTargetSetMountSpeedMessage extends GenericMessage<SetMountSpeed> {
	type: "actorControlTarget";
	subType: "setMountSpeed";
}

export interface ActorControlTargetStatusEffectLoseMessage extends GenericMessage<StatusEffectLose> {
	type: "actorControlTarget";
	subType: "statusEffectLose";
}

export interface ActorControlTargetToggleWeaponMessage extends GenericMessage<ToggleWeapon> {
	type: "actorControlTarget";
	subType: "toggleWeapon";
}

export interface ActorControlTargetUpdateRestedExpMessage extends GenericMessage<UpdateRestedExp> {
	type: "actorControlTarget";
	subType: "updateRestedExp";
}

export interface ResultDialogMarketTaxRatesMessage extends GenericMessage<MarketTaxRates> {
	type: "resultDialog";
	subType: "marketTaxRates";
}

export interface ResultDialogReductionResultMessage extends GenericMessage<ReductionResult> {
	type: "resultDialog";
	subType: "reductionResult";
}

export type Message =
	| ActorCastMessage
	| ActorControlMessage
	| ActorControlSelfMessage
	| ActorControlTargetMessage
	| ActorFreeSpawnMessage
	| ActorGaugeMessage
	| ActorMoveMessage
	| ActorOwnerMessage
	| ActorSetPosMessage
	| AddStatusEffectMessage
	| AirshipExplorationResultMessage
	| AirshipStatusMessage
	| AirshipStatusListMessage
	| AirshipTimersMessage
	| BlackListMessage
	| CFAvailableContentsMessage
	| CFDutyInfoMessage
	| CFPlayerInNeedMessage
	| CFRegisterDutyMessage
	| CharaVisualEffectMessage
	| ClientTriggerMessage
	| ContainerInfoMessage
	| CraftingLogMessage
	| CurrencyCrystalInfoMessage
	| DesynthResultMessage
	| EffectResultMessage
	| EorzeaTimeOffsetMessage
	| EquipDisplayFlagsMessage
	| EventFinishMessage
	| EventPlayMessage
	| EventPlay32Message
	| EventPlay4Message
	| EventPlay64Message
	| EventPlay8Message
	| EventPlayNMessage
	| EventStartMessage
	| FreeCompanyDialogMessage
	| FreeCompanyInfoMessage
	| FreeCompanyUpdateShortMessageMessage
	| GatheringLogMessage
	| InitZoneMessage
	| InventoryModifyHandlerMessage
	| InventoryTransactionMessage
	| IslandWorkshopSupplyDemandMessage
	| ItemInfoMessage
	| ItemMarketBoardInfoMessage
	| LogMessageMessage
	| LogoutMessage
	| MarketBoardItemListingMessage
	| MarketBoardItemListingCountMessage
	| MarketBoardItemListingHistoryMessage
	| MarketBoardPurchaseMessage
	| MarketBoardPurchaseHandlerMessage
	| MarketBoardSearchResultMessage
	| MountMessage
	| NpcSpawnMessage
	| ObjectSpawnMessage
	| PersistentEffectMessage
	| PlayerSetupMessage
	| PlayerSpawnMessage
	| PlayerStatsMessage
	| PlayTimeMessage
	| PrepareZoningMessage
	| ResultDialogMessage
	| RetainerInformationMessage
	| ServerNoticeMessage
	| StatusEffectListMessage
	| SubmarineExplorationResultMessage
	| SubmarineProgressionStatusMessage
	| SubmarineStatusListMessage
	| SubmarineTimersMessage
	| SystemLogMessageMessage
	| UpdateClassInfoMessage
	| UpdateHpMpTpMessage
	| UpdateInventorySlotMessage
	| UpdatePositionHandlerMessage
	| UpdatePositionInstanceMessage
	| WeatherChangeMessage
	| ActorControlActionStartMessage
	| ActorControlAutoAttackMessage
	| ActorControlDailyQuestSeedMessage
	| ActorControlEObjSetStateMessage
	| ActorControlFishingBaitMsgMessage
	| ActorControlSetMountSpeedMessage
	| ActorControlStatusEffectLoseMessage
	| ActorControlToggleWeaponMessage
	| ActorControlUpdateRestedExpMessage
	| ActorControlSelfActionStartMessage
	| ActorControlSelfAutoAttackMessage
	| ActorControlSelfDailyQuestSeedMessage
	| ActorControlSelfEObjSetStateMessage
	| ActorControlSelfFishingBaitMsgMessage
	| ActorControlSelfSetMountSpeedMessage
	| ActorControlSelfStatusEffectLoseMessage
	| ActorControlSelfToggleWeaponMessage
	| ActorControlSelfUpdateRestedExpMessage
	| ActorControlTargetActionStartMessage
	| ActorControlTargetAutoAttackMessage
	| ActorControlTargetDailyQuestSeedMessage
	| ActorControlTargetEObjSetStateMessage
	| ActorControlTargetFishingBaitMsgMessage
	| ActorControlTargetSetMountSpeedMessage
	| ActorControlTargetStatusEffectLoseMessage
	| ActorControlTargetToggleWeaponMessage
	| ActorControlTargetUpdateRestedExpMessage
	| ResultDialogMarketTaxRatesMessage
	| ResultDialogReductionResultMessage;
