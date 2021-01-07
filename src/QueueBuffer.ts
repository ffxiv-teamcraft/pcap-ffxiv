export class QueueBuffer extends Buffer {
	private _end: number = 0;

	static fromBuffer(buf: Buffer): QueueBuffer {
		const qb = Object.create(QueueBuffer);
		return Object.assign(buf, { _end: 0 }, qb.prototype);
	}

	get end() {
		return this._end;
	}

	push(buf: Buffer) {
		this.set(buf, this._end);
		this._end += buf.length;
	}

	pop(size: number): Buffer {
		const bytesToCopy = Math.min(this._end, size);
		const buf = Buffer.allocUnsafe(bytesToCopy);
		if (bytesToCopy > 0) {
			this.copy(buf);
			this.set(this.slice(bytesToCopy));
			this._end -= bytesToCopy;
		}
		return buf;
	}

	popUntil(fn: (buf: Buffer) => boolean, startIndex?: number, endIndex?: number): Buffer {
		for (let i = startIndex || 0; i < (endIndex || this._end + 1); i++) {
			if (fn(this.slice(i, this._end))) {
				return this.pop(i);
			}
		}
		return this.pop((endIndex || this._end + 1) - 1);
	}
}
