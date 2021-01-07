export class QueueBuffer extends Buffer {
	private _end: number = 0;

	static fromBuffer(buf: Buffer): QueueBuffer {
		const qb = Object.create(QueueBuffer);
		return Object.assign(buf, qb, qb.prototype);
	}

	push(buf: Buffer) {
		this.set(buf, this._end);
		this._end += buf.length;
	}

	pop(size: number): Buffer {
		const bytesToCopy = size > this._end ? this._end : size;
		const buf = Buffer.allocUnsafe(bytesToCopy);
		this.copy(buf);
		this.set(this.slice(bytesToCopy));
		this._end -= bytesToCopy;
		return buf;
	}
}
