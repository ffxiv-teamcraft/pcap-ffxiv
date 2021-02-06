import { ActorControl, SetMountSpeed } from "../../../definitions";

export function setMountSpeed(packet: ActorControl): SetMountSpeed {
	return {
		...packet,
		mountSpeed: +packet.param1,
	};
}
