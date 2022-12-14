import { SuperPacketProcessor } from "../models";
import { desynthResult } from "./processors/event-resume/desynthResult";
import { reductionResult } from "./processors/event-resume/reductionResult";
import { retrieveMateriaResult } from "./processors/event-resume/retrieveMateriaResult";
import { talkEvent } from "./processors/event-resume/talkEvent";
import { EventResume } from "../definitions";

/**
* THIS IS A GENERATED FILE, DO NOT EDIT IT BY HAND.
*
* To update it, restart the build process.
*/

export const eventResumePacketProcessors: Record<string, SuperPacketProcessor<EventResume>> = { 
	desynthResult,
	reductionResult,
	retrieveMateriaResult,
	talkEvent, 
};
