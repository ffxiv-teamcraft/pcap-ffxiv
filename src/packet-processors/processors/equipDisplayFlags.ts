import { BufferReader } from "../../BufferReader";
import { EquipDisplayFlags } from "../../definitions";

export function equipDisplayFlags(reader: BufferReader): EquipDisplayFlags {
	return {
		bitmask: reader.nextUInt8(),
	};
}
