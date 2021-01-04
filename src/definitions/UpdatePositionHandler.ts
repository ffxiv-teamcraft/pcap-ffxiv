export interface UpdatePositionHandler {
	rotation: number;
	animationType: number;
	animationState: number;
	clientAnimationType: number;
	headPosition: number;
	pos: {
		x: number;
		y: number;
		z: number;
	};
	unknown: number[];
}
