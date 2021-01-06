export interface BlackList {
	entries: { contentID: bigint, name: string }[]
	sequence: number;
}
