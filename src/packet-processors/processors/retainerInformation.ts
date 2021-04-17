import { BufferReader } from "../../BufferReader";
import { RetainerInformation } from "../../definitions";
import { ConstantsList, Region } from "../../models";

export function retainerInformation(reader: BufferReader, constants: ConstantsList, region?: Region): RetainerInformation {
	const commonRegionPart = {
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
	};
	if (region === "Global") {
		return {
			...commonRegionPart,
			name: reader.nextString(20),
		};
	}
	return {
		...commonRegionPart,
		name: reader.nextString(27),
	};
}
