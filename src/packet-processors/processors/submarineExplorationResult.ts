import { BufferReader } from "../../BufferReader";
import { SubmarineExplorationResult } from "../../definitions";

export function submarineExplorationResult(buffer: BufferReader): SubmarineExplorationResult {
	return {
		// 0 = SS, 1 = S, A = 2, B = 3, 4 = C
		rating: buffer.nextUInt16(),
		submarineSpeed: buffer.nextUInt16(),
		explorationResult: Array(5).fill(null).map(() => ({
			sectorId: buffer.nextUInt8(),
			rating: buffer.nextUInt8(),
			unlockedSectorId: buffer.nextUInt8(),
			firstTimeExploration: !!buffer.nextUInt8(),
			unlockedSubmarineSlot: !!buffer.nextUInt8(),
			doubleDip: !!buffer.nextUInt8(),

			unknown0: buffer.nextUInt16(),

			favorResult: buffer.nextUInt32(),
			exp: buffer.nextUInt32(),
			loot1ItemId: buffer.nextUInt32(),
			loot2ItemId: buffer.nextUInt32(),
			loot1Quantity: buffer.nextUInt16(),
			loot2Quantity: buffer.nextUInt16(),
			loot1IsHq: !!buffer.nextUInt8(),
			loot2IsHq: !!buffer.nextUInt8(),

			// Both to indicate whether loot 1 or 2 is in the tier 3 pool
			// 0 = yes, 1 = no
			unknown1: buffer.nextUInt8(),
			unknown2: buffer.nextUInt8(),

			loot1SurveillanceResult: buffer.nextUInt32(),
			loot2SurveillanceResult: buffer.nextUInt32(),
			loot1RetrievalResult: buffer.nextUInt32(),
			loot2RetrievalResult: buffer.nextUInt32(),

			// Might need a better name
			// SubmarineExplorationLog 10-13
			// 10=HQ, 11=NQ item that could possible be HQ, 12, 13 are item type that cannot HQ
			loot1ItemDiscoveryDescription: buffer.nextUInt32(),
			loot2ItemDiscoveryDescription: buffer.nextUInt32(),
		})),
		unknown3: buffer.nextUInt32(),
	};
}