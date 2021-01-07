export class QueueBuffer {
	private _end: number;
	public buffer: Buffer;

	constructor(buf: Buffer) {
		this._end = 0;
		this.buffer = buf;
	}

	push(buf: Buffer) {
		this.buffer.set(buf, this._end);
		this._end += buf.length;
	}

	pop(size: number): Buffer {
		const buf = Buffer.alloc(size);
		const bytesToCopy = size > this._end ? this._end : size;
		this.buffer.copy(buf, 0, 0, bytesToCopy);
		this.buffer.set(this.buffer.slice(bytesToCopy), 0);
		this._end -= bytesToCopy;
		return buf;
	}
}
