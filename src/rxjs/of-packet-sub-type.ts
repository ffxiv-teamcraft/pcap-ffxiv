import { MonoTypeOperatorFunction } from "rxjs";
import { filter } from "rxjs/operators";
import { Message } from "../models/Message";

export function ofPacketSubType<R extends Message>(subType: string): MonoTypeOperatorFunction<R> {
	return filter<R>((packet) => {
		return packet.subType === subType;
	});
}
