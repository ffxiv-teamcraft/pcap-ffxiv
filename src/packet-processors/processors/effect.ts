import { BufferReader } from "../../BufferReader";
import { Effect } from "../../definitions";

export function effect(reader: BufferReader): Effect {
	return {
		animationTargetId: reader.nextUInt64(),
		actionId: reader.nextUInt32(),
		sequence: reader.nextUInt32(),
		animationLockTime: reader.nextFloat(),
		someTargetId: reader.nextUInt32(),
		sourceSequence: reader.nextUInt16(),
		rotation: reader.nextUInt16(),
		actionAnimationId: reader.nextUInt16(), // the animation that is played by the casting character
		variation: reader.nextUInt8(),
		effectDisplayType: reader.nextUInt8(),

		unknown20: reader.nextUInt8(),
		effectCount: reader.nextUInt8(),
		padding_21: reader.nextUInt16(),
		padding_22: Array(3).fill(null).map(() => reader.nextUInt16()),
		effects: Array(8).fill(null)
			.map(() => {
				const chunkReader = reader.nextBuffer(14, true);
				return {
					type: reader.nextUInt8(),
					param0: chunkReader.nextUInt8(),
					param1: chunkReader.nextUInt8(),
					param2: chunkReader.nextUInt8(),
					extendedValueHighestByte: chunkReader.nextUInt8(),
					flags: chunkReader.nextInt8(),
					value: chunkReader.nextUInt16(),
				};
			}),

		padding_6A: Array(3).fill(null).map(() => reader.nextUInt16()),

		effectTargetId: reader.nextUInt32(), // who the effect targets
		effectFlags: reader.nextUInt32(), // nonzero = effects do nothing, no battle log, no ui text - only shows animations

		padding_78: reader.nextUInt32(),
	};
}
