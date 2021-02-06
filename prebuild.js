const path = require("path");
const fs = require("fs");

function createProcessorsLoader(filename, functionName, folder, processorType, processorTypeName, additionalImports) {
	const processorFiles = fs.readdirSync(path.join(__dirname, "./src/packet-processors/", folder));

	const imports = [];
	const processors = [];

	if (additionalImports) {
		imports.push(...additionalImports);
	}

	processorFiles.forEach((file) => {
		if (!file.endsWith(".ts")) {
			return;
		}
		const processorName = file.replace(".ts", "");
		imports.push(`import { ${processorName} } from "./${folder}/${processorName}";`);
		processors.push(processorName);
	});

	const loader = `import { ${processorTypeName} } from "../models/${processorTypeName}";
${imports.join("\n")}

export function ${functionName}(): Record<string, ${processorType}> {
	return { 
		${processors.join(",\n\t\t")}, 
	};
}
`;

	fs.writeFileSync(`./src/packet-processors/${filename}.ts`, loader);
}

createProcessorsLoader(
	"load-packet-processors",
	"loadPacketProcessors",
	"processors",
	"PacketProcessor",
	"PacketProcessor",
);

createProcessorsLoader(
	"load-actor-control-packet-processors",
	"loadActorControlPacketProcessors",
	"processors/actor-control",
	"SuperPacketProcessor<ActorControl>",
	"SuperPacketProcessor",
	[`import { ActorControl } from "../definitions";`],
);

createProcessorsLoader(
	"load-result-dialog-packet-processors",
	"loadResultDialogPacketProcessors",
	"processors/result-dialog",
	"SuperPacketProcessor<ResultDialog>",
	"SuperPacketProcessor",
	[`import { ResultDialog } from "../definitions";`],
);
