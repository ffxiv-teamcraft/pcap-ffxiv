import { BufferReader } from "../../BufferReader";
import { ItemMarketBoardInfo } from "../../definitions";

export function itemMarketBoardInfo(reader: BufferReader): ItemMarketBoardInfo {
	return {
		sequence: reader.nextUInt32(),
		containerId: reader.nextUInt32(),
		slot: reader.nextUInt32(),
		unknown0: reader.nextUInt32(),
		unitPrice: reader.nextUInt32(),
	};
}
