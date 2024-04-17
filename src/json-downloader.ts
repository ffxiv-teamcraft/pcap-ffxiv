import https from "https";

export function downloadJson<T>(uri: string): Promise<T> {
	return new Promise((resolve, reject) => {
		const req = https.request(new URL(uri), (res) => {
			const data: any[] = [];
			res.setEncoding("utf8");
			res.on("data", (chunk) => data.push(chunk));
			res.on("end", () => {
				try {
					resolve(JSON.parse(data.join("")));
				} catch (e) {
					reject(e);
				}
			});
		});
		req.on("error", err => {
			reject(err);
		});
		req.end();
	});
}
