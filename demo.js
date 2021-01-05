const { CaptureInterface } = require("./lib/pcap-ffxiv");

try {
	const ci = new CaptureInterface();

	ci.on("message", (type, message) => {
		console.log(type);
		console.log(message.parsedIpcData);
	});

// Get the first device with an IPv4 address.
	const device = CaptureInterface.getDevices().find(d => d.addresses.some(a => !a.addr.includes("::")));

	ci.on("ready", () => ci.open(device.addresses[0].addr));
} catch (e) {
	console.error(e);
}
