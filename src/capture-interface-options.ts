import { DeucalionPacketHeader, Region } from "./models";

export interface CaptureInterfaceOptions {
	region: Region;
	deucalionDllPath?: string;
	logger: (payload: { type: "info" | "log" | "warn" | "error"; message: string }) => void;
	filter: (header: DeucalionPacketHeader, typeName: string) => boolean;
	localDataPath?: string;
	name?: string;
	/** When set, connect to the deucalion-bridge TCP server instead of a Win32 named pipe.
	 *  Used on Linux where the bridge runs under Wine and forwards the pipe over localhost TCP. */
	bridgeTcpPort?: number;
}
