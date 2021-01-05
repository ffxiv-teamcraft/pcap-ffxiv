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
	const br = new BufferIOReader(buf);
	return {
		magic1: br.UInt64LE(),
		magic2: br.UInt64LE(),
		timestamp: br.UInt64LE(),
		size: br.UInt32LE(),
		connectionType: br.UInt16LE() as ConnectionType,
		segmentCount: br.UInt16LE(),
		unknown20: br.UInt8(),
		isCompressed: Boolean(br.UInt8()),
		unknown24: br.UInt32LE(),
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
