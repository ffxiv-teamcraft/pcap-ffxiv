import { ActionStart, ActorControl } from "../../../definitions";

export function actionStart(packet: ActorControl): ActionStart {
	return {
		...packet,
		actionId: +packet.param2,
		actionCooldown: +packet.param3 / 100,
	};
}
