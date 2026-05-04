export interface FishCaught {
	itemId: number;
	size: number;
	unknown: number; // Always 1 ?
	unknown2: number;
	flags: number; // HQ is flags >> 6
}