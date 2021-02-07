import { packetProcessors } from "../packet-processors/packet-processors";
import { Segment } from "./Segment";
import { actorControlPacketProcessors } from "../packet-processors/actor-control-packet-processors";
import { resultDialogPacketProcessors } from "../packet-processors/result-dialog-packet-processors";

type BrandedRegistryLookup<R extends Record<string, (...args: any[]) => any>> = {
	[K in keyof R]: Segment<ReturnType<R[K]>> & { type: K };
} & { [key: string]: unknown };

export type ProcessorRegistry = BrandedRegistryLookup<typeof packetProcessors>[keyof BrandedRegistryLookup<
	typeof packetProcessors
>];
export type ActorControlProcessorRegistry = BrandedRegistryLookup<typeof actorControlPacketProcessors>;
export type ResultDialogProcessorRegistry = BrandedRegistryLookup<typeof resultDialogPacketProcessors>;
