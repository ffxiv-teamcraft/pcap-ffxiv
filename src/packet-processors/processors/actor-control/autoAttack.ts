import { ActorControl, AutoAttack } from "../../../definitions";

export function autoAttack(packet: ActorControl): AutoAttack {
	return {
		...packet,
		active: packet.param1 === 1,
	};
}
