import { BufferReader } from "../../BufferReader";
import { PlayerSetup } from "../../definitions";
import { ConstantsList } from "../../models";

export function playerSetup(reader: BufferReader, constants?: ConstantsList): PlayerSetup {
	return {
		contentId: reader.nextUInt64(),
		unknown8: reader.nextUInt32(),
		unknownC: reader.nextUInt32(),
		charId: reader.nextUInt32(),
		restedExp: reader.nextUInt32(),
		companionCurrentExp: reader.nextUInt32(),
		unknown1C: reader.nextUInt32(),
		fishCaught: reader.nextUInt32(),
		useBaitCatalogId: reader.nextUInt32(),
		unknown28: reader.nextUInt32(),
		unknownPvp2C: reader.nextUInt32(),
		unknown3: reader.nextUInt32(),
		pvpFrontlineOverallCampaigns: reader.nextUInt32(),
		unknownTimestamp34: reader.nextUInt32(),
		unknownTimestamp38: reader.nextUInt32(),
		name: reader
			.slice(0x2f8, 0x318)
			.toString("utf8")
			.replace(/^[\s\uFEFF\xA0\0]+|[\s\uFEFF\xA0\0]+$/g, ""),
		fishingGuideMask: reader.slice(0x06d1, 0x0784),
	};
}
