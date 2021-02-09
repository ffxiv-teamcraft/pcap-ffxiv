import { ActorControl, StatusEffectLose } from "../../../definitions";

export function statusEffectLose(packet: ActorControl): StatusEffectLose {
	return {
		...packet,
		effectId: packet.param1,
	};
}
