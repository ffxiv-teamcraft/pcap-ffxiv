import { SuperPacketProcessor } from "../models/SuperPacketProcessor";
import { marketTaxRates } from "./processors/result-dialog/marketTaxRates";
import { reductionResult } from "./processors/result-dialog/reductionResult";
import { ResultDialog } from "../definitions";

export const resultDialogPacketProcessors: Record<string, SuperPacketProcessor<ResultDialog>> = {
	marketTaxRates,
	reductionResult,
};
