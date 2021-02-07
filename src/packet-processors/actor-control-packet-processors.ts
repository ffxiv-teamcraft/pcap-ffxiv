import { SuperPacketProcessor } from "../models/SuperPacketProcessor";
import { actionStart } from "./processors/actor-control/actionStart";
import { autoAttack } from "./processors/actor-control/autoAttack";
import { dailyQuestSeed } from "./processors/actor-control/dailyQuestSeed";
import { eObjSetState } from "./processors/actor-control/eObjSetState";
import { fishingBaitMsg } from "./processors/actor-control/fishingBaitMsg";
import { setMountSpeed } from "./processors/actor-control/setMountSpeed";
import { toggleWeapon } from "./processors/actor-control/toggleWeapon";
import { updateRestedExp } from "./processors/actor-control/updateRestedExp";
import { ActorControl } from "../definitions";

export const actorControlPacketProcessors: Record<string, SuperPacketProcessor<ActorControl>> = {
	actionStart,
	autoAttack,
	dailyQuestSeed,
	eObjSetState,
	fishingBaitMsg,
	setMountSpeed,
	toggleWeapon,
	updateRestedExp,
};
