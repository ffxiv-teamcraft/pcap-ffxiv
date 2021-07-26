const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface();

ci.on("message", (message) => {
	if (message.type === "inventoryModifyHandler") {
		console.log("------------- ContainerInfo", message.parsedIpcData);
	}
}).on("error", console.error);

ci.once("ready", () => {
	ci.start().then(() => {
		console.log("Everything is started !");
	});
});
