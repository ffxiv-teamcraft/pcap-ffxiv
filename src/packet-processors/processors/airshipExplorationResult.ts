import { BufferReader } from "../../BufferReader";
import { AirshipExplorationResult } from "../../definitions";

function getSector(value): number {
	return value === 128 ? -1 : value;
}

export function airshipExplorationResult(buffer: BufferReader): AirshipExplorationResult {
	return {
		rating: buffer.nextUInt16(),
		airshipSpeed: buffer.nextUInt16(),
		explorationResult: Array(5)
			.fill(null)
			.map(() => {
				return {
					exp: buffer.nextUInt32(),
					favorResult: buffer.nextUInt32(),
					// -1 = no sector
					sectorId: getSector(buffer.nextUInt8()),
					// if sectorId > -1, the default value is -1, else it's 0
					discoveredSectorId: getSector(buffer.nextUInt8()),
					// 2 = 100%, 3 = 50%
					expRating: buffer.nextUInt8(),

					unknown0: buffer.nextUInt8(),

					loot1ItemId: buffer.nextUInt32(),
					loot2ItemId: buffer.nextUInt32(),
					loot1Quantity: buffer.nextUInt16(),
					loot2Quantity: buffer.nextUInt16(),
					loot1SurveillanceResult: buffer.nextUInt32(),
					loot2SurveillanceResult: buffer.nextUInt32(),
					loot1RetrievalResult: buffer.nextUInt32(),
					loot2RetrievalResult: buffer.nextUInt32(),

					// Might need a better name
					// AirshipExplorationLog 10-13
					// 10=HQ, 11=NQ item that could possible be HQ, 12, 13 are item type that cannot HQ
					loot1ItemDiscoveryDescription: buffer.nextUInt32(),
					loot2ItemDiscoveryDescription: buffer.nextUInt32(),

					unknown1: buffer.nextUInt16(),
					unknown2: buffer.nextUInt8(),

					doubleDip: !!buffer.nextUInt8(),
					loot1IsHq: !!buffer.nextUInt8(),
					loot2IsHq: !!buffer.nextUInt8(),

					unknown3: buffer.nextUInt16(),
				};
			}),
	};
}
