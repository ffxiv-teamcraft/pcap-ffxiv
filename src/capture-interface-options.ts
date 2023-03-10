import { DeucalionPacketHeader, Region } from "./models";

export interface CaptureInterfaceOptions {
	region: Region;
	deucalionDllPath: string;
	logger: (payload: { type: "info" | "log" | "warn" | "error"; message: string }) => void;
	filter: (header: DeucalionPacketHeader, typeName: string) => boolean;
	localDataPath?: string;
}
