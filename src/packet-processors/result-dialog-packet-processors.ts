import { SuperPacketProcessor } from "../models/SuperPacketProcessor";
import { marketTaxRates } from "./processors/result-dialog/marketTaxRates";
import { reductionResult } from "./processors/result-dialog/reductionResult";
import { ResultDialog } from "../definitions";

/**
 * THIS IS A GENERATED FILE, DO NOT EDIT IT BY HAND.
 *
 * To update it, restart the build process.
 */

export const resultDialogPacketProcessors: Record<string, SuperPacketProcessor<ResultDialog>> = {
	marketTaxRates,
	reductionResult,
};
