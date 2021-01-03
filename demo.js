const { CaptureInterface } = require("./lib/pcap-ffxiv");
const ci = new CaptureInterface();
ci.open(process.argv[2]);