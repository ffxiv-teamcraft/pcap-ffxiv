import { BufferReader } from "../../buffer-reader";
import { InitZone } from "../../definitions";

export function initZone(reader: BufferReader): InitZone {
	return {
		serverId: reader.nextUInt16(),
		zoneId: reader.nextUInt16(),
		unknown1: reader.nextUInt16(),
		contentfinderConditionId: reader.nextUInt16(),
		unknown3: reader.nextUInt32(),
		unknown4: reader.nextUInt32(),
		weatherId: reader.nextUInt8(),
		bitmask: reader.nextUInt8(),
		bitmask1: reader.nextUInt8(),
		unknown5: reader.nextUInt8(),
		unknown8: reader.nextUInt32(),
		festivalId: reader.nextUInt16(),
		additionalFestivalId: reader.nextUInt16(),
		unknown9: reader.nextUInt32(),
		unknown10: reader.nextUInt32(),
		unknown11: reader.nextUInt32(),
		unknown12: Array.from(new Uint32Array(reader.nextBuffer(4 * 4))),
		unknown13: Array.from(new Uint32Array(reader.nextBuffer(4 * 3))),
		pos: {
			x: reader.nextFloat(),
			y: reader.nextFloat(),
			z: reader.nextFloat(),
		},
		unknown14: Array.from(new Uint32Array(reader.nextBuffer(4 * 3))),
		unknown15: reader.nextUInt32(),
	};
}
