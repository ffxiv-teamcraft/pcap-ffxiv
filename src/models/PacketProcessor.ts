import { BufferReader } from "../BufferReader";
import { ConstantsList } from "./ConstantsList";
import { Region } from "./Region";

export type PacketProcessor = (reader: BufferReader, constants: ConstantsList, region?: Region) => any;
