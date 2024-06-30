import { SuperPacketProcessor } from "../models";
import { reductionResult } from "./processors/result-dialog/reductionResult";
import { ResultDialog } from "../definitions";

/**
* THIS IS A GENERATED FILE, DO NOT EDIT IT BY HAND.
*
* To update it, restart the build process.
*/

export const resultDialogPacketProcessors: Record<string, SuperPacketProcessor<ResultDialog>> = { 
	reductionResult, 
};
