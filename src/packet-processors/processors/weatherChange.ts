import { BufferReader } from "../../BufferReader";
import { WeatherChange } from "../../definitions/WeatherChange";

export function weatherChange(reader: BufferReader): WeatherChange {
	return {
		weatherId: reader.nextUInt32(),
		delay: reader.nextFloat(),
	};
}
