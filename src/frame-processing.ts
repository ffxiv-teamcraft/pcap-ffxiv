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
	return {
		size: buf.readUInt32LE(0),
		sourceActor: buf.readUInt32LE(4),
		targetActor: buf.readUInt32LE(8),
		segmentType: buf.readUInt16LE(12) as SegmentType,
	};
}

export function parseIpcHeader(buf: Buffer): IpcHeader {
	return {
		reserved: buf.readUInt16LE(0),
		type: buf.readUInt16LE(2),
		serverId: buf.readUInt16LE(6),
		timestamp: buf.readUInt32LE(8),
	};
}
