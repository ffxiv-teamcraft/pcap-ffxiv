import { MarketBoardItemListing, MateriaEntry } from "../../definitions";
import { BufferReader } from "../../BufferReader";

export function marketBoardItemListing(reader: BufferReader): MarketBoardItemListing {
	return {
		listings: Array(10)
			.fill(null)
			.map(() => {
				return {
					listingId: reader.nextUInt64(),
					retainerId: reader.nextUInt64(),
					retainerOwnerId: reader.nextUInt64(),
					artisanId: reader.nextUInt64(),
					pricePerUnit: reader.nextUInt32(),
					totalTax: reader.nextUInt32(),
					quantity: reader.nextUInt32(),
					itemId: reader.nextUInt32(),
					lastReviewTime: reader.nextUInt32(),
					containerId: reader.nextUInt16(),
					slot: reader.nextUInt16(),
					durability: reader.nextUInt16(),
					spiritbond: reader.nextUInt16(),
					materia: Array(5)
						.fill(null)
						.map(() => {
							const entry = reader.nextUInt16();
							return {
								materiaId: entry & (0xff0 >> 4),
								index: entry & 0xf,
							};
						}) as [MateriaEntry, MateriaEntry, MateriaEntry, MateriaEntry, MateriaEntry],
					padding1: reader.nextUInt16(),
					padding2: reader.nextUInt32(),
					retainerName: reader.nextString(0x20),
					playerName: reader.nextString(0x20),
					hq: reader.nextUInt8() === 1,
					materiaCount: reader.nextUInt8(),
					onMannequin: reader.nextUInt8() === 1,
					city:
						{
							0x01: "Limsa Lominsa",
							0x02: "Gridania",
							0x03: "Ul'dah",
							0x04: "Ishgard",
							0x07: "Kugane",
							0x0a: "Crystarium",
						}[reader.nextUInt8()] || "Unknown",
					dyeId: reader.nextUInt16(),
					padding3: reader.nextUInt16(),
					padding4: reader.nextUInt32(),
				};
			})
			.filter((listing) => listing.pricePerUnit > 0),
	};
}
