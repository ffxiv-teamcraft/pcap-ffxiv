type BufferFnProperties = Pick<Buffer, {
	[K in keyof Buffer]: Buffer[K] extends Function ? K : never
}[keyof Buffer]>;

export class BufferReader {
	private offset = 0;

	constructor(private buf: Buffer) {
	}

	reset(): void {
		this.offset = 0;
	}

	move(offset: number): void {
		this.offset = offset;
	}

	skip(length: number): void {
		this.offset += length;
	}

	nextString(length: number, encoding: BufferEncoding = "utf8") {
		this.offset += length;
		try {
			return this.buf.toString(encoding, this.offset - length, this.offset);
		} catch (e) {
			return "";
		}
	}

	nextInt8(fallback = 0): number {
		return this.tryNext("readInt8", 1, fallback);
	}

	nextUInt8(fallback = 0): number {
		return this.tryNext("readUInt8", 1, fallback);
	}

	nextUInt16(fallback = 0): number {
		return this.tryNext("readUInt16LE", 2, 0);
	}

	nextInt16(fallback = 0): number {
		return this.tryNext("readInt16LE", 2, 0);
	}

	nextUInt32(fallback = 0): number {
		return this.tryNext("readUInt32LE", 4, 0);
	}

	nextInt32(fallback = 0): number {
		return this.tryNext("readInt32LE", 4, 0);
	}

	nextUInt64(fallback = 0): bigint {
		return this.tryNext("readBigInt64LE", 8, BigInt(0));
	}

	nextInt64(fallback = 0): bigint {
		return this.tryNext("readBigUInt64LE", 8, BigInt(0));
	}

	nextFloat(fallback = 0): number {
		return this.tryNext("readFloatLE", 4, 0);
	}

	nextDouble(fallback = 0): number {
		return this.tryNext("readDoubleLE", 8, 0);
	}

	private tryNext<T>(fn: keyof BufferFnProperties, size: number, fallback: T): T {
		try {
			if (typeof this.buf[fn] !== "function") {
				console.error(`Tried to read data using a non-function buffer prop, this shouldn't happen: ${fn}`);
				return fallback;
			}
			const value: T = (<Function>this.buf[fn])(this.offset);
			this.offset += size;
			return value;
		} catch (e) {
			//TODO Log a warning or something?
			return fallback;
		}
	}
}
