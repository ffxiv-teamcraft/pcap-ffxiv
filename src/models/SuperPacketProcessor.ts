import { ConstantsList } from "./ConstantsList";
import { BufferReader } from "../BufferReader";
import { SuperPacket } from "./SuperPacket";
import { Region } from "./Region";

export type SuperPacketProcessor<T extends SuperPacket> = (
	parent: T,
	reader: BufferReader,
	constants: ConstantsList,
	region?: Region,
) => T & any;
