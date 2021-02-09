import { BufferReader } from "../../BufferReader";
import { UpdatePositionInstance } from "../../definitions";

export function updatePositionInstance(reader: BufferReader): UpdatePositionInstance {
	return {
		rotation: reader.nextFloat(),
		interpolateRotation: reader.nextFloat(),
		pos: reader.nextPosition3(),
		interpolatePos: reader.nextPosition3(),
	};
}
