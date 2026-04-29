import { createReadStream, createWriteStream, open, ReadStream, WriteStream } from "fs";
import { createConnection, Socket } from "net";
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
	/** Used instead of readStream/writeStream when connecting via TCP (Linux bridge mode). */
	private _socket?: Socket;
	/** Set to true by stop() to abort the startTcp retry loop. */
	private _stopped = false;

	private remaining?: Buffer;

	public get running() {
		return this.readStream !== undefined || this._socket !== undefined;
	}

	pipe_path!: string;

	constructor(
		private readonly logger: CaptureInterfaceOptions["logger"],
		readonly pid: number,
		private readonly name = "PCAP_FFXIV",
		private readonly bridgeTcpPort?: number,
	) {
		super();
		this.pipe_path = `\\\\.\\pipe\\deucalion-${pid}`;
		if (!/^[A-Za-z0-9_]+$/.test(this.name)) {
			throw new Error("Please provide a name that matches ^[A-Za-z0-9_]+$");
		}
	}

	public start(): Promise<void> {
		return this.bridgeTcpPort !== undefined ? this.startTcp() : this.startPipe();
	}

	private startPipe(): Promise<void> {
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
					this.readStream = createReadStream(this.pipe_path, { fd });
					this.writeStream = createWriteStream(this.pipe_path, { fd });
					this.sendHandshake();
					this.setupDataListeners();
					clearInterval(connectInterval);
					resolve();
				});
			}, 200);
		});
	}

	private startTcp(): Promise<void> {
		this._stopped = false;
		return new Promise((resolve) => {
			let tries = 0;
			const tryConnect = () => {
				if (this._stopped) return;
				const socket = createConnection({ host: "127.0.0.1", port: this.bridgeTcpPort! });
				socket.on("connect", () => {
					if (this._stopped) {
						socket.destroy();
						return;
					}
					this._socket = socket;
					this.sendHandshake();
					this.setupDataListeners();
					resolve();
				});
				socket.on("error", (err) => {
					socket.destroy();
					tries++;
					// Log every ~5 seconds so the log isn't flooded
					if (tries % 25 === 1) {
						this.logger({
							type: "info",
							message: `[TCP] Waiting for deucalion bridge on :${this.bridgeTcpPort} (${tries} attempts)…`,
						});
					}
					if (!this._stopped) setTimeout(tryConnect, 200);
				});
			};
			tryConnect();
		});
	}

	private sendHandshake() {
		const optionPayload = Buffer.alloc(9);
		optionPayload.writeUInt32LE(9, 0);
		optionPayload[4] = Operation.OPTION;
		optionPayload.writeUInt32LE((1 << 1) | (1 << 4), 5);
		this.send(optionPayload);
		const nicknameBufferSize = 9 + this.name.length;
		const nicknamePayload = Buffer.alloc(nicknameBufferSize);
		nicknamePayload.writeUInt32LE(nicknameBufferSize, 0);
		nicknamePayload[4] = Operation.DEBUG;
		nicknamePayload.writeUInt32LE(9000, 5);
		nicknamePayload.write(this.name, 9, "utf-8");
		this.send(nicknamePayload);
	}

	public stop() {
		this._stopped = true;
		return new Promise<void>(async (resolve) => {
			try {
				await this.closeStreams();
			} catch (err: any) {
				if (!err.message.includes("EBADF")) {
					this.logger({
						type: "error",
						message: err,
					});
				}
			}
			this.emit("closed");
			resolve();
		});
	}

	private send(data: Buffer) {
		return this._socket ? this._socket.write(data) : this.writeStream?.write(data);
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

	private closeStreams(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				if (this._socket) {
					this._socket.destroy();
					this._socket = undefined;
				} else {
					this.readStream?.close();
					this.writeStream?.close();
				}
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	}

	private setupDataListeners() {
		const readable = this._socket ?? this.readStream;
		if (!readable) {
			return;
		}
		readable.on("data", (data: Buffer) => {
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

		readable.on("close", () => {
			this.logger({
				type: "info",
				message: "Client closed",
			});
			this.closeStreams()
				.then(() => {
					this.emit("closed");
				})
				.catch(() => {
					this.emit("closed");
				});
		});

		readable.on("end", () => {
			this.logger({
				type: "info",
				message: "Pipe end",
			});
		});

		readable.on("error", (err: Error) => {
			// Close happened
			if (err.message.includes("EBADF")) {
				return;
			}
			// Game closed
			if (err.message.includes("EOF")) {
				return;
			}
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
