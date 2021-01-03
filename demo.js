const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface();
ci.on("message", (_type, message) => {
    console.log(message);
})

ci.open(process.argv[2]);
