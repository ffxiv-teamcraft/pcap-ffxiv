const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface({
	filter: (header, typeName) => typeName === "actorControlSelf",
});

ci.on("message", (message) => {
	console.log(message);
}).on("error", console.error);

ci.once("ready", () => {
	ci.start().then(() => {
		console.log("Everything is started !");
	});
});
