import { BufferReader } from "../../buffer-reader";
import { UpdatePositionInstance } from "../../definitions/UpdatePositionInstance";

export function updatePositionInstance(reader: BufferReader): UpdatePositionInstance {
	return {
		rotation: reader.nextFloat(),
		interpolateRotation: reader.nextFloat(),
		pos: reader.nextPosition3(),
		interpolatePos: reader.nextPosition3(),
	};
}
