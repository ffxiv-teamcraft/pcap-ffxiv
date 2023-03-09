const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface({
	region: "Global",
});

ci.on("message", (message) => {
	console.log(message.type);
}).on("error", console.error);

ci.once("ready", () => {
	ci.start();
	console.log("Everything is started !");
});
