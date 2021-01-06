import { Position3 } from "./Position3";

export interface ActorMove {
	headRotation: number;
	rotation: number;
	animationType: number;
	animationState: number;
	animationSpeed: number;
	pos: Position3;
}
