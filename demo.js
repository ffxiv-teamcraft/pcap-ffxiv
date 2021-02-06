const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface({
	filter: (header, type) => type === "updatePositionHandler",
});

ci.on("message", (type, message) => {
	console.log(type);
}).on("error", console.error);

ci.once("ready", () => {
	ci.start().then(() => {
		console.log("Everything is started !");
	});
});
