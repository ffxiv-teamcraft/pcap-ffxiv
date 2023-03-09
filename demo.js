const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface({
	region: "Global"
});

ci.on("message", (message) => {
	console.log(message.type);
}).on("error", err => {
	console.error("ERR EVENT", err);
});

ci.once("ready", () => {
	ci.start().then(() => {
		console.log("Everything is started !");
	}).catch(err => {
		console.log("Error starting pcap:", err);
	});
});
