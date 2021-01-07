import { BufferReader } from "../../BufferReader";
import { ActorMove } from "../../definitions/ActorMove";

export function actorMove(reader: BufferReader): ActorMove {
	return {
		headRotation: reader.nextUInt8(),
		rotation: reader.nextUInt8(),
		animationType: reader.nextUInt8(),
		animationState: reader.nextUInt8(),
		animationSpeed: reader.nextUInt8(),
		pos: reader.nextPosition3(),
	};
}
