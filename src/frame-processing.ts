import BufferReader from "buffer-reader";
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
	const br = new BufferReader(buf);
	return {
		size: br.nextUInt32LE(),
		sourceActor: br.nextUInt32LE(),
		targetActor: br.nextUInt32LE(),
		segmentType: br.nextUInt16LE() as SegmentType,
	};
}

export function parseIpcHeader(buf: Buffer): IpcHeader {
	const br = new BufferReader(buf);
	return {
		reserved: br.nextUInt16LE(),
		type: br.nextUInt16LE(),
		padding: br.nextUInt16LE(),
		serverId: br.nextUInt16LE(),
		timestamp: br.nextUInt32LE(),
		padding1: br.nextUInt32LE(),
	};
}
