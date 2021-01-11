export function roundToNextPowerOf2(x: number): number {
	x--;
	while (x & (x - 1)) x = x & (x - 1);
	x <<= 1;
	return x;
}
