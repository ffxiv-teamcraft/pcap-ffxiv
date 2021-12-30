const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface({
	localDataPath: "G:\\WebstormProjects\\FFXIVOpcodes",
});

ci.on("message", (message) => {
	if (message.type === "npcSpawn") {
		console.log(message.parsedIpcData.name);
	}
}).on("error", console.error);

ci.once("ready", () => {
	ci.start().then(() => {
		console.log("Everything is started !");
	});
});
