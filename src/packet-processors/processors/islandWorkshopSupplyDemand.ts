import { BufferReader } from "../../BufferReader";
import { IslandWorkshopSupplyDemand } from "../../definitions";

export function islandWorkshopSupplyDemand(reader: BufferReader): IslandWorkshopSupplyDemand {
	return {
		popularity: reader.nextUInt8(),
		predictedPopularity: reader.nextUInt8(),
		supplyDemand: new Array(62)
			.fill(null)
			.map((_, i) => {
				const value = reader.nextUInt8();
				return {
					id: i,
					supply: value >> 4,
					demand: value & 0xf,
				};
			}),
	};
}
