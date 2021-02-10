import { SuperPacketProcessor } from "../models";
import { actionStart } from "./processors/actor-control/actionStart";
import { autoAttack } from "./processors/actor-control/autoAttack";
import { dailyQuestSeed } from "./processors/actor-control/dailyQuestSeed";
import { eObjSetState } from "./processors/actor-control/eObjSetState";
import { fishingBaitMsg } from "./processors/actor-control/fishingBaitMsg";
import { setMountSpeed } from "./processors/actor-control/setMountSpeed";
import { statusEffectLose } from "./processors/actor-control/statusEffectLose";
import { toggleWeapon } from "./processors/actor-control/toggleWeapon";
import { updateRestedExp } from "./processors/actor-control/updateRestedExp";
import { ActorControl } from "../definitions";

/**
 * THIS IS A GENERATED FILE, DO NOT EDIT IT BY HAND.
 *
 * To update it, restart the build process.
 */

export const actorControlPacketProcessors: Record<string, SuperPacketProcessor<ActorControl>> = {
	actionStart,
	autoAttack,
	dailyQuestSeed,
	eObjSetState,
	fishingBaitMsg,
	setMountSpeed,
	statusEffectLose,
	toggleWeapon,
	updateRestedExp,
};
