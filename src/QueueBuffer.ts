export class QueueBuffer extends Buffer {
	private _end: number = 0;

	static fromBuffer(buf: Buffer): QueueBuffer {
		const qb = Object.create(QueueBuffer);
		return Object.assign(buf, { _end: 0 }, qb.prototype);
	}

	push(buf: Buffer) {
		this.set(buf, this._end);
		this._end += buf.length;
	}

	pop(size: number): QueueBuffer {
		const bytesToCopy = Math.min(this._end, size);
		const buf = Buffer.allocUnsafe(bytesToCopy);
		if (bytesToCopy > 0) {
			this.copy(buf);
			this.set(this.slice(bytesToCopy));
			this._end -= bytesToCopy;
		}
		return QueueBuffer.fromBuffer(buf);
	}

	popUntil(fn: (buf: Buffer) => boolean, startIndex?: number, endIndex?: number): QueueBuffer {
		for (let i = startIndex || 0; i < (endIndex || this._end + 1); i++) {
			if (fn(this.slice(i))) {
				return this.pop(i);
			}
		}
		return this.pop((endIndex || this._end + 1) - 1);
	}
}
