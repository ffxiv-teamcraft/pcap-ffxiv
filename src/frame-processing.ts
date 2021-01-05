import { BufferIOReader } from "@imed.ch/buffer-io";
import { ConnectionType, FrameHeader, SegmentHeader, SegmentType } from "./models";
import { IpcHeader } from "./models/IpcHeader";

export function isMagical(header: FrameHeader): boolean {
	return (
		header.magic1.toString() === "16304822851840528978" &&
		header.magic2.toString() === "8486076352731294335"
	);
}

export function parseFrameHeader(buf: Buffer): FrameHeader {
	return {
		magic1: buf.readBigUInt64LE(0),
		magic2: buf.readBigUInt64LE(8),
		timestamp: buf.readBigUInt64LE(16),
		size: buf.readUInt32LE(24),
		connectionType: buf.readUInt16LE(28) as ConnectionType,
		segmentCount: buf.readUInt16LE(30),
		unknown20: buf.readUInt8(32),
		isCompressed: Boolean(buf.readUInt8(33)),
		unknown24: buf.readUInt32LE(34),
	};
}

export function parseSegmentHeader(buf: Buffer): SegmentHeader {
	const br = new BufferIOReader(buf);
	return {
		size: br.UInt32LE(),
		sourceActor: br.UInt32LE(),
		targetActor: br.UInt32LE(),
		segmentType: br.UInt16LE() as SegmentType,
	};
}

export function parseIpcHeader(buf: Buffer): IpcHeader {
	const br = new BufferIOReader(buf);
	return {
		reserved: br.UInt16LE(),
		type: br.UInt16LE(),
		padding: br.UInt16LE(),
		serverId: br.UInt16LE(),
		timestamp: br.UInt32LE(),
		padding1: br.UInt32LE(),
	};
}
