import { PlayerSetup } from "../definitions";

export function playerSetup(buf: Buffer): PlayerSetup {
	return {
		contentId: buf.readBigUInt64LE(0x00),
		unknown8: buf.readUInt32LE(0x08),
		unknownC: buf.readUInt32LE(0x0c),
		charId: buf.readUInt32LE(0x10),
		restedExp: buf.readUInt32LE(0x14),
		companionCurrentExp: buf.readUInt32LE(0x18),
		unknown1C: buf.readUInt32LE(0x1c),
		fishCaught: buf.readUInt32LE(0x20),
		useBaitCatalogId: buf.readUInt32LE(0x24),
		unknown28: buf.readUInt32LE(0x28),
		unknownPvp2C: buf.readUInt32LE(0x2c),
		unknown3: buf.readUInt32LE(0x30),
		pvpFrontlineOverallCampaigns: buf.readUInt32LE(0x34),
		unknownTimestamp34: buf.readUInt32LE(0x34),
		unknownTimestamp38: buf.readUInt32LE(0x38),
		name: buf.slice(0x23a, 0x25a).toString("utf8"),
	};
}
