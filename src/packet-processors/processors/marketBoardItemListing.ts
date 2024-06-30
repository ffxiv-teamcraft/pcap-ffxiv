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
					// Removed in 7.0; using placeholder value for backwards-compatibility
					lastReviewTime: 0,
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
					// Empty as of 7.0
					playerName: reader.nextString(0x20),
					hq: reader.nextUInt8() === 1,
					materiaCount: reader.nextUInt8(),
					onMannequin: reader.nextUInt8() === 1,
					city: reader.nextUInt8(),
					primaryDyeId: reader.nextUInt8(),
					secondaryDyeId: reader.nextUInt8(),
					padding3: reader.nextUInt32(),
				};
			})
			.map((listing) => ({
				...listing,
				// Repack the data for backwards-compatibility
				dyeId: (listing.primaryDyeId << 8) | listing.secondaryDyeId,
			}))
			.filter((listing) => listing.pricePerUnit > 0),
		listingIndexEnd: reader.nextUInt8(),
		listingIndexStart: reader.nextUInt8(),
		requestId: reader.nextUInt16(),
	};
}
