import { ActorControl, EObjSetState } from "../../../definitions";

export function eObjSetState(packet: ActorControl): EObjSetState {
	return {
		...packet,
		state: +packet.param1,
		actorId: +packet.param2,
	};
}
