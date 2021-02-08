import { MonoTypeOperatorFunction } from "rxjs";
import { filter } from "rxjs/operators";
import { Message } from "../models/Message";

export function ofPacketType<R extends Message>(type: string, subType?: string): MonoTypeOperatorFunction<R> {
	return filter<R>((packet) => {
		let matches = type === packet.type;
		if (subType) {
			matches = matches && packet.subType === subType;
		}
		return matches;
	});
}
