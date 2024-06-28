export interface Effect {
	animationTargetId: BigInt;
	actionId: number;
	sequence: number;
	animationLockTime: number;
	someTargetId: number;
	sourceSequence: number;
	rotation: number;
	actionAnimationId: number;
	variation: number;
	unknown20: number;
	effectCount: number;
	padding_21: number;
	padding_22: number[];
	effectDisplayType: number;
	effects: {
		param0: number,
		param1: number,
		param2: number,
		extendedValueHighestByte: number,
		flags: number,
		value: number
	}[];
	padding_6A: number[];
	effectTargetId: number;
	effectFlags: number;
	padding_78: number;
}
