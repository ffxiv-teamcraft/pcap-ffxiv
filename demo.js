const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface({
	filter: (header, typeName) => ["freeCompanyInfo", "itemInfo"].includes(typeName),
});

let counter = 0;

ci.on("message", (message) => {
	if (message.type === "itemInfo") {
		counter++;
		console.log("ItemInfo messages emitted", counter);
	}
}).on("error", console.error);

ci.once("ready", () => {
	ci.start().then(() => {
		console.log("Everything is started !");
	});
});
