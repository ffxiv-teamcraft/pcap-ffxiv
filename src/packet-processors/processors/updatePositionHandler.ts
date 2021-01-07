import { BufferReader } from "../../BufferReader";
import { UpdatePositionHandler } from "../../definitions/UpdatePositionHandler";

export function updatePositionHandler(reader: BufferReader): UpdatePositionHandler {
	return {
		rotation: reader.nextFloat(),
		animationType: reader.nextUInt8(),
		animationState: reader.nextUInt8(),
		clientAnimationType: reader.nextUInt8(),
		headPosition: reader.nextUInt8(),
		pos: reader.nextPosition3(),
	};
}
