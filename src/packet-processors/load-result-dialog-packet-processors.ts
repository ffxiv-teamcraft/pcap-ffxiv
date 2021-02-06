import { SuperPacketProcessor } from "../models/SuperPacketProcessor";
import { ResultDialog } from "../definitions";
import { marketTaxRates } from "./processors/result-dialog/marketTaxRates";
import { reductionResult } from "./processors/result-dialog/reductionResult";

export function loadResultDialogPacketProcessors(): Record<string, SuperPacketProcessor<ResultDialog>> {
	return { 
		marketTaxRates,
		reductionResult, 
	};
}
