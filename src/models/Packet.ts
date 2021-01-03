import { Frame } from "./Frame";
import { PeerInfo } from "./PeerInfo";

export interface Packet {
	source: PeerInfo;
	destination: PeerInfo;
	childFrame: Frame;
}
