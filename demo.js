const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface({
	filter: (header, typeName) => typeName === "resultDialog",
});

ci.on("message", (type, message) => {
	console.log(message);
}).on("error", console.error);

ci.once("ready", () => {
	ci.start().then(() => {
		console.log("Everything is started !");
	});
});
