import { ActorControl, UpdateRestedExp } from "../../../definitions";

export function updateRestedExp(packet: ActorControl): UpdateRestedExp {
	return {
		...packet,
		exp: +packet.param1,
	};
}
