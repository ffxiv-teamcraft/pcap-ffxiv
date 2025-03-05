import { BufferReader } from "../../BufferReader";
import { RetainerInformation } from "../../definitions";
import { ConstantsList, Region } from "../../models";

export function retainerInformation(
	reader: BufferReader,
	constants?: ConstantsList,
	region?: Region,
): RetainerInformation {
	// Global: 20 characters.
	// Korean: 9 characters (each character is 3 bytes).
	const nameLength = region != "KR" ? 20 : 27;
	return {
		unknown0: reader.nextUInt64(),
		retainerId: reader.nextUInt64(),
		hireOrder: reader.nextUInt8(),
		itemCount: reader.nextUInt8(),
		unknown5: reader.nextUInt16(),
		gil: reader.nextUInt32(),
		sellingCount: reader.nextUInt8(),
		cityId: reader.nextUInt8(),
		classJob: reader.nextUInt8(),
		level: reader.nextUInt8(),
		unknown11: reader.nextUInt32(),
		ventureId: reader.nextUInt32(),
		ventureComplete: reader.nextUInt32(),
		unknown14: reader.nextUInt8(),
		name: reader.skip(4).nextString(nameLength),
	};
}
