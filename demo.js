const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface({
	filter: (header, typeName) => ["containerInfo", "itemInfo"].includes(typeName),
});

let counter = 0;

ci.on("message", (message) => {
	if (message.type === "containerInfo") {
		console.log("------------- ContainerInfo", message.parsedIpcData.containerId);
	}
	if (message.type === "itemInfo") {
		console.log("ItemInfo", message.parsedIpcData.containerId);
	}
}).on("error", console.error);

ci.once("ready", () => {
	ci.start().then(() => {
		console.log("Everything is started !");
	});
});
