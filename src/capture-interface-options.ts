import { Region, SegmentHeader } from "./models";

export interface CaptureInterfaceOptions {
	region: Region;
	exePath: string;
	monitorType: "WinPCap" | "RawSocket";
	logger: (payload: { type: "info" | "log" | "warn" | "error"; message: string }) => void;
	port: number;
	hasWine: boolean;
	winePrefix: string;
	filter: (header: SegmentHeader, typeName: string) => boolean;
	pid?: number;
	/**
	 * @deprecated Use localDataPath instead.
	 */
	localOpcodesPath?: string;
	localDataPath?: string;
}
