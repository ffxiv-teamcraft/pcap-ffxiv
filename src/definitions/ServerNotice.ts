export interface ServerNotice {
	displayFlag: number;
	displayFlagType: "chatLog" | "noDisplay" | "onScreen" | "onScreenAndChatLog";
	message: string;
}
