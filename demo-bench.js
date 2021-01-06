const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface();

let pTime = 0;
let n = 0;
ci.on("diagnostics", diagInfo => {
    pTime = (diagInfo.lastProcessingTimeMs + n * pTime) / ++n;
	console.log("avg:", pTime)
});

// Get the first device with an IPv4 address.
const device = CaptureInterface.getDevices().find(d => d.addresses.some(a => !a.addr.includes("::")));

ci.on("ready", () => ci.open(device.addresses[0].addr));
