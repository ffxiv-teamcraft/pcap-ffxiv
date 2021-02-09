import { BufferReader } from "../../BufferReader";
import { Logout } from "../../definitions";

export function logout(reader: BufferReader): Logout {
	return {
		flags1: reader.nextUInt32(0),
		flags2: reader.nextUInt32(0),
	};
}
