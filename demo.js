const { CaptureInterface } = require("./lib/pcap-ffxiv");

const ci = new CaptureInterface();
let packets = 0;

ci.on("packet", (type, message) => {
	console.log(++packets);
}).on("error", console.error);

// Get the first device with an IPv4 address.
const device = CaptureInterface.getDevices().find((d) => d.addresses.some((a) => !a.addr.includes("::")));

ci.on("ready", () => ci.open(device.addresses[0].addr));
