import { BufferReader } from "../../buffer-reader";
import { EquipDisplayFlags } from "../../definitions/EquipDisplayFlags";

export function equipDisplayFlags(reader: BufferReader): EquipDisplayFlags {
	return {
		bitmask: reader.nextUInt8(),
	};
}
