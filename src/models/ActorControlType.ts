// Source: https://github.com/SapphireServer/Sapphire/blob/develop/src/common/Network/CommonActorControl.h
export enum ActorControlType {
	/*! Toggles weapon status -> Sheathed/UnSheathed
			\param param1 status 0|1 */
	ToggleWeapon = 0x00,
	/*! Toggles Autoattack status on/off
			\param param1 status 0|1 */
	AutoAttack = 0x01,
	SetStatus = 0x02,
	CastStart = 0x03,
	ToggleAggro = 0x04,
	ClassJobChange = 0x05,
	DefeatMsg = 0x06,
	GainExpMsg = 0x07,

	LevelUpEffect = 0x0a,

	ExpChainMsg = 0x0c,
	HpSetStat = 0x0d,
	DeathAnimation = 0x0e,
	CastInterrupt = 0x0f,

	/*!
	 * @brief Sent when a player uses an action
	 *
	 * param1 Seems to be always 1 from what I've seen, needs more research
	 * param2 The actionid
	 * param3 The action cooldown in ms / 10
	 */
	ActionStart = 0x11,

	StatusEffectGain = 0x14,
	StatusEffectLose = 0x15,

	HPFloatingText = 0x17,
	UpdateRestedExp = 0x018,
	Unk2 = 0x19,

	Flee = 0x1b,

	Unk3 = 0x20, // Animation related?

	CombatIndicationShow = 0x22,

	SpawnEffect = 0x25,
	ToggleInvisible = 0x26,

	ToggleActionUnlock = 0x29,

	UpdateUiExp = 0x2b,
	DmgTakenMsg = 0x2d,

	SetTarget = 0x32,
	ToggleNameHidden = 0x36,

	LimitbreakStart = 0x47,
	LimitbreakPartyStart = 0x48,
	BubbleText = 0x49,

	DamageEffect = 0x50,
	RaiseAnimation = 0x51,
	TreasureScreenMsg = 0x57,
	SetOwnerId = 0x59,
	ItemRepairMsg = 0x5c,
	BluActionLearn = 0x63, // Displays "Action Learned!" animation. Only used for visual, doesn't actually unlock it. param1: actionId. param2: 0 = text only, 1 = text+animation. Verification needed

	DirectorInit = 0x64,
	DirectorClear = 0x65,

	LeveStartAnim = 0x66,
	LeveStartError = 0x67,
	DirectorEObjMod = 0x6a,

	DirectorUpdate = 0x6d,

	ItemObtainMsg = 0x75,
	DutyQuestScreenMsg = 0x7b,

	ItemObtainIcon = 0x84,
	FateItemFailMsg = 0x85,
	ItemFailMsg = 0x86,
	ActionLearnMsg1 = 0x87,

	FreeEventPos = 0x8a,

	DailyQuestSeed = 0x90, // param1 = the daily quest seed

	SetBGM = 0xa1,

	UnlockAetherCurrentMsg = 0xa4,

	RemoveName = 0xa8,

	ScreenFadeOut = 0xaa,

	ZoneIn = 0xc8,
	ZoneInDefaultPos = 0xc9,

	TeleportStart = 0xcb,

	TeleportDone = 0xcd,
	TeleportDoneFadeOut = 0xce,
	DespawnZoneScreenMsg = 0xcf,

	InstanceSelectDlg = 0xd2,
	ActorDespawnEffect = 0xd4,

	CompanionUnlock = 0xfd,
	ObtainBarding = 0xfe,
	EquipBarding = 0xff,

	CompanionMsg1 = 0x102,
	CompanionMsg2 = 0x103,
	ShowPetHotbar = 0x104,

	ActionLearnMsg = 0x109,
	ActorFadeOut = 0x10a,
	ActorFadeIn = 0x10b,
	WithdrawMsg = 0x10c,
	OrderCompanion = 0x10d,
	ToggleCompanion = 0x10e,
	LearnCompanion = 0x10f,
	ActorFateOut1 = 0x110,

	Emote = 0x122,
	EmoteInterrupt = 0x123,

	SetPose = 0x127,

	CraftingUnk = 0x12c,

	GatheringSenseMsg = 0x130,
	PartyMsg = 0x131,
	GatheringSenseMsg1 = 0x132,

	GatheringSenseMsg2 = 0x138,

	FishingMsg = 0x140,

	FishingTotalFishCaught = 0x142,
	FishingBaitMsg = 0x145,

	FishingReachMsg = 0x147,
	FishingFailMsg = 0x148,

	MateriaConvertMsg = 0x15e,
	MeldSuccessMsg = 0x15f,
	MeldFailMsg = 0x160,
	MeldModeToggle = 0x161,

	AetherRestoreMsg = 0x163,

	DyeMsg = 0x168,

	ToggleCrestMsg = 0x16a,
	ToggleBulkCrestMsg = 0x16b,
	MateriaRemoveMsg = 0x16c,
	GlamourCastMsg = 0x16d,
	GlamourRemoveMsg = 0x16e,

	RelicInfuseMsg = 0x179,

	AetherReductionDlg = 0x17d,

	/*!
	 * param1 = state
	 * param2 = actorid
	 */
	EObjSetState = 0x199,
	Unk6 = 0x19c,
	EObjAnimation = 0x19d,

	SetTitle = 0x1f4,

	SetStatusIcon = 0x1f8,
	LimitBreakGauge = 0x1f9, // Max level, amount, build type (chop sound), lb type(0=pve lb 1=pvp lb)
	SetHomepoint = 0x1fb,
	SetFavorite = 0x1fc,
	LearnTeleport = 0x1fd,

	OpenRecommendationGuide = 0x200,
	ArmoryErrorMsg = 0x201,

	AchievementPopup = 0x203,

	LogMsg = 0x205, // LogMessage?
	AchievementMsg = 0x206,

	SetItemLevel = 0x209,

	ChallengeEntryCompleteMsg = 0x20b,
	ChallengeEntryUnlockMsg = 0x20c,

	/*!
	 * Sent when a player desynths an item, one packet per result type (one for consumed item, one for each obtained items, and one for exp if the player received exp)
	 * param1 = result type (4921 => Item consumed, 4922 => Item obtained, 4925 => Exp obtained)
	 * param3 = item id (used for result types 4921 & 4922)
	 * param5 = exp amount (x 100)
	 */
	DesynthOrReductionResult = 0x20f,

	GilTrailMsg = 0x211,

	HuntingLogRankUnlock = 0x21d,
	HuntingLogEntryUpdate = 0x21e,
	HuntingLogSectionFinish = 0x21f,
	HuntingLogRankFinish = 0x220,

	SetMaxGearSets = 0x230,

	SetCharaGearParamUI = 0x260,
	ToggleWireframeRendering = 0x261,

	ExamineError = 0x2bf,

	GearSetEquipMsg = 0x321,

	SetBait = 0x325, // param1: bait ID

	SetFestival = 0x386, // param1: festival.exd index

	ToggleOrchestrionUnlock = 0x396,

	/*!
	 * param1 = mountSpeed
	 * Retail sends 12 for mount speed star 1 unlocked and 15 for mount speed star 2 unlocked
	 * This also has to be sent before mounting finishes for it to take effect
	 */
	SetMountSpeed = 0x39f,

	Dismount = 0x3a1, // updated 4.5

	// Duty Recorder
	BeginReplayAck = 0x3a2,
	EndReplayAck = 0x3a3,

	// Housing
	ShowHousingItemUI = 0x3f7,
	ShowBuildPresetUI = 0x3e9,
	/*!
	 * param1 = plot id
	 */
	ShowEstateExternalAppearanceUI = 0x3ea,
	ShowEstateInternalAppearanceUI = 0x3eb,
	BuildPresetResponse = 0x3ed,

	/*!
	 * param1 = u16 landid
	 *          u16 slotid
	 */
	RemoveExteriorHousingItem = 0x3ef,

	/*!
	 * param1 = object array index
	 */
	RemoveInteriorHousingItem = 0x3f1,

	/*!
	 * param1 = identity shit
	 *          u16 1 - container id
	 *          u16 2 - plot id
	 * param2 = item shit
	 *          u16 1 - slot
	 */
	HousingItemMoveConfirm = 0x3f9,
	OpenEstateSettingsUI = 0x3ff,
	HideAdditionalChambersDoor = 0x400,

	/*!
	 * param1 = outdoor furnishings
	 *          u8 0 - relocation available, 1 = available
	 *          u8 1 - outoor furnishings placed
	 *          u8 2 - outdoor furnishings in storeroom
	 *          u8 3 - outdoor funishings limit
	 * param2 = indoor furnishings
	 *          u16 0 - relocation available, 1 = available
	 *          u16 1 - furnishings placed
	 * param3 = indoor furnishings
	 *          u16 0 - in storeroom
	 *          u16 1 - indoor furnishings limit
	 */
	HousingStoreroomStatus = 0x419,

	// PvP Duel
	SetPvPState = 0x5e0, // param3 must be 6 to engage a duel (hardcoded in the client)
	EndDuelSession = 0x5e1, // because someone went oob?
	StartDuelCountdown = 0x5e2, // begins a countdown; also does some duel bgm thing.
	StartDuel = 0x5e3, // actually all it does is set the challenger actor id;
	DuelResultScreen = 0x5e4, // win/lose thing, also reset a target id just like what EndDuelSession does.

	// Duty Action
	SetDutyActionId = 0x5e8, // ContentExAction
	SetDutyActionHud = 0x5e9, // disable/enable
	SetDutyActionActive = 0x5ea,
	SetDutyActionRemaining = 0x5eb,

	EurekaStep = 0x73a, // alters the progress of the player on Eureka (is used for all the eureka zones)
}
