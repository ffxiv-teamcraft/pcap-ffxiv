import { BufferReader } from "../../BufferReader";
import { ContainerInfo } from "../../definitions";

export function containerInfo(reader: BufferReader): ContainerInfo {
	return {
		sequence: reader.nextUInt32(),
		numItems: reader.nextUInt32(),
		containerId: reader.nextUInt32(),
		unknown: reader.nextUInt32(),
	};
}
