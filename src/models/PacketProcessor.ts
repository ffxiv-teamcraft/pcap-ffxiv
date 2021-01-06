import { BufferReader } from "../buffer-reader";
import { ConstantsList } from "./ConstantsList";

export type PacketProcessor = (reader: BufferReader, constants: ConstantsList) => any;
