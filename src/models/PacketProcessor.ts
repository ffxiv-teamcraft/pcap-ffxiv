import { BufferReader } from "../BufferReader";
import { ConstantsList } from "./ConstantsList";

export type PacketProcessor = (reader: BufferReader, constants: ConstantsList) => any;
