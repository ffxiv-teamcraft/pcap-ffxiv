export interface BlackList {
	entries: { contentId: bigint; name: string }[];
	sequence: number;
}
