import { ActorControl, ToggleWeapon } from "../../../definitions";

export function toggleWeapon(packet: ActorControl): ToggleWeapon {
	return {
		...packet,
		weaponDrawn: packet.param1 === 1,
	};
}
