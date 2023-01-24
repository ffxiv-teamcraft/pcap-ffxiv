const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface({
	localDataPath: "H:\\WebstormProjects\\FFXIVOpcodes",
	logger: console.log
});

ci.on("message", (message) => {
	console.log(message.type);
}).on("error", console.error);

ci.once("ready", () => {
	ci.start().then(() => {
		console.log("Everything is started !");
	});
});
