import { SuperPacketProcessor } from "../models";
import { itemDesynthResult } from "./processors/desynth-result/itemDesynthResult";
import { marketTaxRates } from "./processors/desynth-result/marketTaxRates";
import { DesynthResult } from "../definitions";

/**
* THIS IS A GENERATED FILE, DO NOT EDIT IT BY HAND.
*
* To update it, restart the build process.
*/

export const desynthResultPacketProcessors: Record<string, SuperPacketProcessor<DesynthResult>> = { 
	itemDesynthResult,
	marketTaxRates, 
};
