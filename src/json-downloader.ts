import https from "https";

export function downloadJson<T>(uri: string): Promise<T> {
	return new Promise((resolve) => {
		const req = https.request(
			new URL(uri),
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
