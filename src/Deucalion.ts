import { createReadStream, createWriteStream, open, ReadStream, WriteStream } from "fs";
import { BufferReader } from "./BufferReader";
import { DeucalionPacket, DeucalionPayload, Origin } from "./models";
import { EventEmitter } from "events";
import { CaptureInterfaceOptions } from "./capture-interface-options";

enum Operation {
	DEBUG,
	PING,
	EXIT,
	RECV,
	SEND,
	OPTION,
}

export class Deucalion extends EventEmitter {
	private readStream?: ReadStream;
	private writeStream?: WriteStream;

	private remaining?: Buffer;

	public get running() {
		return this.readStream !== undefined;
	}

	pipe_path!: string;

	constructor(
		private readonly RECVZONEPACKET_SIG: string,
		private readonly SENDZONEPACKET_SIG: string,
		private readonly logger: CaptureInterfaceOptions["logger"],
		readonly pid: number,
	) {
		super();
		this.pipe_path = `\\\\.\\pipe\\deucalion-${pid}`;
	}

	public start(): Promise<void> {
		return new Promise((resolve, reject) => {
			let tries = 0;
			const connectInterval = setInterval(() => {
				open(this.pipe_path, "r+", (err, fd) => {
					if (err) {
						this.logger({
							type: "error",
							message: `Error while opening pipe ${err.message}`,
						});
						tries++;
						if (tries >= 5) {
							clearInterval(connectInterval);
							reject(err);
						}
						return;
					}
					this.readStream = createReadStream(this.pipe_path, { fd, autoClose: false });
					this.writeStream = createWriteStream(this.pipe_path, { fd, autoClose: false });

					const optionPayload = Buffer.alloc(9);
					optionPayload.writeUInt32LE(9, 0); // 0x04
					optionPayload[4] = Operation.OPTION; // 0x05
					optionPayload.writeUInt32LE((1 << 1) | (1 << 4), 5); // 0x09
					this.send(optionPayload);
					this.setupDataListeners();
					clearInterval(connectInterval);
					resolve();
				});
			}, 200);
		});
	}

	public stop() {
		return new Promise<void>((resolve) => {
			this.readStream?.close();
			this.writeStream?.close();
			resolve();
		});
	}

	private send(data: Buffer) {
		return this.writeStream?.write(data);
	}

	private nextPacket(buffer: Buffer): { packet: DeucalionPayload | null; remaining: Buffer | null } {
		const reader = new BufferReader(buffer);
		/**
		 * Removing 9 bytes because it includes:
		 *  - size: 4B
		 *  - op: 1B
		 *  - channel: 4B
		 */
		const size = reader.nextUInt32() - 9;
		const packet: DeucalionPayload = {
			size: size,
			op: reader.nextInt8(),
			channel: reader.nextUInt32(),
			data: reader.nextBuffer(size),
		};
		const remaining = reader.restAsBuffer();
		if (packet.data.length === packet.size) {
			return {
				packet,
				remaining: remaining.length === 0 ? null : remaining,
			};
		} else {
			return {
				packet: null,
				remaining: buffer,
			};
		}
	}

	private handleDeucalionPacket(packet: DeucalionPayload): void {
		switch (packet.op) {
			case Operation.DEBUG:
				this.handleDebug(packet.data);
				break;
			case Operation.PING:
				// Ignore ping for now
				break;
			case Operation.RECV:
				this.handleXIVPacket(packet.channel, Origin.Server, packet.data);
				break;
			case Operation.SEND:
				this.handleXIVPacket(packet.channel, Origin.Client, packet.data);
				break;
		}
	}

	private handleDebug(data: Buffer): void {
		this.logger({
			type: "info",
			message: `DEUCALION: ${data.toString()}`,
		});
	}

	private handleXIVPacket(channel: number, origin: Origin, data: Buffer): void {
		// Let's ignore non-zone packets
		if (channel !== 1) {
			return;
		}
		const reader = new BufferReader(data);
		const packet: DeucalionPacket = {
			origin,
			header: {
				sourceActor: reader.nextUInt32(),
				targetActor: reader.nextUInt32(),
				ipcTimestamp: reader.nextUInt64(),
				reserved: reader.nextInt16(),
				type: reader.nextInt16(),
				padding: reader.nextInt16(),
				serverId: reader.nextInt16(),
				timestamp: reader.nextUInt32(),
				padding1: reader.nextUInt32(),
			},
			data: reader.restAsBuffer(),
		};
		this.emit("packet", packet);
	}

	private setupDataListeners() {
		if (!this.readStream || !this.writeStream) {
			return;
		}
		this.readStream.on("data", (data: Buffer) => {
			let { packet, remaining } = this.nextPacket(data);
			while (packet !== null) {
				this.handleDeucalionPacket(packet);
				if (remaining) {
					const next = this.nextPacket(remaining);
					packet = next.packet;
					remaining = next.remaining;
				} else {
					packet = null;
					remaining = null;
				}
			}
			if (remaining) {
				this.logger({
					type: "log",
					message: `Remaining ! 0x${remaining.toString("hex")}`,
				});
				this.remaining = remaining;
			} else {
				delete this.remaining;
			}
		});

		this.readStream.on("close", () => {
			this.logger({
				type: "info",
				message: "Client closed",
			});
			this.emit("closed");
		});

		this.readStream.on("end", () => {
			this.logger({
				type: "info",
				message: "Pipe end",
			});
			this.emit("closed");
		});

		this.readStream.on("error", (err: Error) => {
			this.logger({
				type: "error",
				message: `Deucalion error: ${err.message}`,
			});
			if (err.message.includes("ENOENT")) {
				console.error(err);
			} else {
				this.emit("error", err);
			}
		});
	}
}
