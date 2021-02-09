import { BufferReader } from "../../BufferReader";
import { ServerNotice } from "../../definitions";

const displayFlags = {
	0: "chatLog",
	2: "noDisplay",
	4: "onScreen",
	5: "onScreenAndChatLog",
};

export function serverNotice(reader: BufferReader): ServerNotice {
	const flag = reader.nextUInt8();
	return {
		displayFlag: flag,
		displayFlagType: displayFlags[flag],
		message: reader.nextString(),
	};
}
