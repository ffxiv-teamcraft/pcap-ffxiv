import { createWriteStream, open } from "fs";
import { Socket } from "net";
import { BufferReader } from "./BufferReader";

enum Operation {
	DEBUG,
	PING,
	EXIT,
	RECV
}

export class Deucalion {

	private static readonly RECVZONEPACKET_SIG = "49 8B 40 10 4C 8B 50 38";

	private socket?: Socket;

	public get running() {
		return this.socket !== undefined;
	}

	public start() {
		//TODO get PID at runtime
		const PIPE_PATH = `\\\\.\\pipe\\deucalion-7936`;
		open(PIPE_PATH, "r+", (err, fd) => {
			if (err) {
				console.error("Error while opening pipe", err);
				return;
			}

			this.socket = new Socket({
				fd,
				readable: true,
				writable: false,
			});

			this.socket.connect({ path: PIPE_PATH }, () => {
				console.log("Connected to pipe");
				const recvInitPayload = Buffer.alloc(32);
				recvInitPayload.writeUInt32LE(32, 0); // 0x04
				recvInitPayload[4] = Operation.RECV; // 0x05
				recvInitPayload.writeUInt32LE(1, 5); // 0x09
				recvInitPayload.write(Deucalion.RECVZONEPACKET_SIG, 9, "utf-8");
				const writeStream = createWriteStream(PIPE_PATH);
				writeStream.write(recvInitPayload, () => {
					console.log("SENT RECV INIT");
					writeStream.end();
				});
			});

			this.socket.on("data", (data) => {
				this.handleData(data);
			});

			this.socket.on("error", (err: Error) => {
				console.error("Client had an error", err);
			});

			this.socket.on("close", () => {
				console.error("Client closed");
			});
		});
	}

	handleData(data: Buffer): void {
		const reader = new BufferReader(data);
		const size = reader.nextUInt32();
		const op = reader.nextInt8();
		const channel = reader.nextUInt32();
		const packet = reader.nextBuffer(size);
		switch (op) {
			case Operation.DEBUG:
				console.log(`DEBUG: ${packet.toString()}`);
				break;
			case Operation.PING:
				// Ignore ping for now
				break;
			case Operation.EXIT:
				this.socket?.end(() => delete this.socket);
				break;
			case Operation.RECV:
				this.handleRecv(channel, packet);
				break;
		}
	}

	private PACKET_COUNT = 0;

	private handleRecv(channel: number, packet: Buffer): void {
		// Let's ignore non-zone packets
		if (channel !== 1) {
			return;
		}
		const reader = new BufferReader(packet);
		const header = {
			source_actor: reader.nextUInt32(),
			target_actor: reader.nextUInt32(),
			reserved: reader.nextInt16(),
			type: reader.nextInt16(),
			padding: reader.nextInt16(),
			serverId: reader.nextInt16(),
			timestamp: reader.nextUInt32(),
			padding1: reader.nextUInt32(),
		};
		this.PACKET_COUNT++;
		console.log(this.PACKET_COUNT, reader.restAsBuffer());
	}
}
