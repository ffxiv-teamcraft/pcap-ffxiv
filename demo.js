const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface();
ci.on("message", (type, message) => {
    console.log(type);
    console.log(message.parsedIpcData);
})
ci.on("ready", () => ci.open(process.argv[2]));
