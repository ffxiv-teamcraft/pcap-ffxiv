import { ConstantsList } from "./ConstantsList";
import { BufferReader } from "../BufferReader";
import { SuperPacket } from "./SuperPacket";

export type SuperPacketProcessor<T extends SuperPacket> = (
	parent: T,
	reader: BufferReader,
	constants: ConstantsList,
) => T & any;
