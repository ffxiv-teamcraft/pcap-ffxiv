import { BufferReader } from "../../buffer-reader";
import { ItemInfo } from "../../definitions";

export function itemInfo(reader: BufferReader): ItemInfo {
	return {
		containerSequence: reader.nextUInt32(),
		unknown: reader.nextUInt32(),
		containerId: reader.nextUInt16(),
		slot: reader.nextUInt16(),
		quantity: reader.nextUInt32(),
		catalogId: reader.nextUInt32(),
		reservedFlag: reader.nextUInt32(),
		signatureId: reader.nextUInt64(),
		hqFlag: Boolean(reader.nextUInt8()),
		unknown2: reader.nextUInt8(),
		condition: reader.nextUInt16(),
		spiritBond: reader.nextUInt16(),
		stain: reader.nextUInt16(),
		glamourCatalogId: reader.nextUInt32(),
		materia: [
			reader.nextUInt16(),
			reader.nextUInt16(),
			reader.nextUInt16(),
			reader.nextUInt16(),
			reader.nextUInt16(),
		],
		materiaTiers: [
			reader.nextUInt8(),
			reader.nextUInt8(),
			reader.nextUInt8(),
			reader.nextUInt8(),
			reader.nextUInt8(),
		],
		padding: reader.nextUInt8(),
		unknown10: reader.nextUInt32(),
	};
}
