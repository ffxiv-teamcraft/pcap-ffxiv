const path = require("path");
const fs = require("fs");

const rootProcessors = fs.readdirSync(path.join(__dirname, "./src/packet-processors/processors"));

const imports = [];
const processors = [];

rootProcessors.forEach(file => {
	if (!file.endsWith(".ts")) {
		return;
	}
	const processorName = file.replace(".ts", "");
	imports.push(`import { ${processorName} } from "./processors/${processorName}";`);
	processors.push(processorName);
});

const loader = `import { PacketProcessor } from "../models/PacketProcessor";
${imports.join('\n')}

export function loadPacketProcessors(): Record<string, PacketProcessor> {
	return { 
		${processors.join(',\n\t\t')}, 
	};
}
`;

fs.writeFileSync("./src/packet-processors/load-packet-processors.ts", loader);
