import https from "https";
import { OpcodeList } from "./models";

export function downloadOpcodes(): Promise<OpcodeList[]> {
	return new Promise((resolve) => {
		const req = https.request(
			new URL("https://raw.githubusercontent.com/karashiiro/FFXIVOpcodes/master/opcodes.json"),
			(res) => {
				const data: any[] = [];
				res.setEncoding("utf8");
				res.on("data", (chunk) => data.push(chunk));
				res.on("end", () => resolve(JSON.parse(data.join(""))));
			},
		);
		req.end();
	});
}
