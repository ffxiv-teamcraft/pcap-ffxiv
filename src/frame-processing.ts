import { ConnectionType, FrameHeader, SegmentHeader, SegmentType } from "./models";
import { IpcHeader } from "./models/IpcHeader";
import { BufferReader } from "./BufferReader";

export function isMagical(header: FrameHeader): boolean {
	return header.magic1.toString() === "16304822851840528978" && header.magic2.toString() === "8486076352731294335";
}

export function parseFrameHeader(buf: Buffer): FrameHeader {
	const br = new BufferReader(buf);
	return {
		magic1: br.nextUInt64(),
		magic2: br.nextUInt64(),
		timestamp: br.nextUInt64(),
		size: br.nextUInt32(),
		connectionType: br.nextUInt16() as ConnectionType,
		segmentCount: br.nextUInt16(),
		unknown20: br.nextUInt8(),
		isCompressed: Boolean(br.nextUInt8()),
		unknown24: br.nextUInt32(),
	};
}

export function parseSegmentHeader(buf: Buffer): SegmentHeader {
	const br = new BufferReader(buf);
	return {
		size: br.nextUInt32(),
		sourceActor: br.nextUInt32(),
		targetActor: br.nextUInt32(),
		segmentType: br.nextUInt16() as SegmentType,
	};
}

export function parseIpcHeader(buf: Buffer): IpcHeader {
	const br = new BufferReader(buf);
	return {
		reserved: br.nextUInt16(),
		type: br.nextUInt16(),
		padding: br.nextUInt16(),
		serverId: br.nextUInt16(),
		timestamp: br.nextUInt32(),
		padding1: br.nextUInt32(),
	};
}
