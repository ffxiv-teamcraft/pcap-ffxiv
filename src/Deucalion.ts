import { open } from "fs";
import { Socket } from "net";
import { BufferReader } from "./BufferReader";
import { DeucalionPacket, DeucalionPayload, Origin } from "./models";
import { EventEmitter } from "events";
import { CaptureInterfaceOptions } from "./capture-interface-options";

enum Operation {
	DEBUG,
	PING,
	EXIT,
	RECV
}

export class Deucalion extends EventEmitter {
	private socket?: Socket;

	private remaining?: Buffer;

	public get running() {
		return this.socket !== undefined;
	}

	pipe_path!: string;

	constructor(private RECVZONEPACKET_SIG: string, private logger: CaptureInterfaceOptions["logger"], pid = 24280) {
		super();
		this.pipe_path = `\\\\.\\pipe\\deucalion-${pid}`;
	}

	public start(): void {
		open(this.pipe_path, "r+", (err, fd) => {
			if (err) {
				console.error("Error while opening pipe", err);
				return;
			}

			this.socket = new Socket({
				fd,
				readable: true,
				writable: false,
			});

			this.socket.connect({ path: this.pipe_path }, () => {
				const recvInitPayload = Buffer.alloc(32);
				recvInitPayload.writeUInt32LE(32, 0); // 0x04
				recvInitPayload[4] = Operation.RECV; // 0x05
				recvInitPayload.writeUInt32LE(1, 5); // 0x09
				recvInitPayload.write(this.RECVZONEPACKET_SIG, 9, "utf-8");
				this.send(recvInitPayload);
			});

			this.socket.on("data", (data) => {
				let { packet, remaining } = this.nextPacket(data);
				while (packet !== null) {
					this.handlePacket(packet);
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
						message: `Remaining ! ${remaining.toString("hex")}`,
					});
					this.remaining = remaining;
				} else {
					delete this.remaining;
				}
			});

			this.socket.on("error", (err: Error) => {
				this.logger({
					type: "error",
					message: `Deucalion error: ${err.message}`,
				});
			});

			this.socket.on("close", () => {
				this.logger({
					type: "info",
					message: "Client closed",
				});
			});
		});
	}

	public stop(exit = false): void {
		this.socket?.end(() => {
			const exitPayload = Buffer.alloc(5);
			exitPayload.writeUInt32LE(5, 0); // 0x04
			exitPayload[4] = Operation.EXIT; // 0x05
			this.send(exitPayload);
			if (exit) {
				process.exit(0);
			}
		});
	}

	private send(data: Buffer) {
		return this.socket?.write(data);
	}

	private nextPacket(buffer: Buffer): { packet: DeucalionPayload | null, remaining: Buffer | null } {
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

	private handlePacket(packet: DeucalionPayload): void {
		switch (packet.op) {
			case Operation.DEBUG:
				this.logger({
					type: "info",
					message: `DEUCALION: ${packet.data.toString()}`,
				});
				break;
			case Operation.PING:
				// Ignore ping for now
				break;
			case Operation.EXIT:
				this.socket?.end(() => delete this.socket);
				break;
			case Operation.RECV:
				this.handleRecv(packet.channel, packet.data);
				break;
		}
	}

	private handleRecv(channel: number, data: Buffer): void {
		// Let's ignore non-zone packets
		if (channel !== 1) {
			return;
		}
		const reader = new BufferReader(data);
		const packet: DeucalionPacket = {
			origin: Origin.Server,
			header: {
				sourceActor: reader.nextUInt32(),
				targetActor: reader.nextUInt32(),
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
}
