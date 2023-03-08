import { DeucalionPacketHeader, Region } from "./models";

export interface CaptureInterfaceOptions {
	region: Region;
	deucalionExePath: string;
	logger: (payload: { type: "info" | "log" | "warn" | "error"; message: string }) => void;
	port: number;
	hasWine: boolean;
	winePrefix: string;
	filter: (header: DeucalionPacketHeader, typeName: string) => boolean;
	localDataPath?: string;
}
