const path = require("path");
const fs = require("fs");

function generateImportsAndProcessors(folder) {
	const processorFiles = fs.readdirSync(path.join(__dirname, "./src/packet-processors/", folder));

	const imports = [];
	const processors = [];

	processorFiles.forEach((file) => {
		if (!file.endsWith(".ts")) {
			return;
		}
		const processorName = file.replace(".ts", "");
		imports.push(`import { ${processorName} } from "./${folder}/${processorName}";`);
		processors.push(processorName);
	});

	return { imports, processors };
}

function createProcessorsLoader(filename, propertyName, folder, processorType, processorTypeName, additionalImports) {
	const { imports, processors } = generateImportsAndProcessors(folder);

	if (additionalImports) {
		imports.push(...additionalImports);
	}

	const loader = `import { ${processorTypeName} } from "../models/${processorTypeName}";
${imports.join("\n")}

/**
* THIS IS A GENERATED FILE, DO NOT EDIT IT BY HAND.
*
* To update it, restart the build process.
*/

export const ${propertyName}: Record<string, ${processorType}> = { 
	${processors.join(",\n\t")}, 
};
`;

	fs.writeFileSync(`./src/packet-processors/${filename}.ts`, loader);
}

function createMessageType() {
	const { processors } = generateImportsAndProcessors("processors");

	const imports = [];
	const interfaces = [];
	const interfaceNames = [];

	processors.forEach((processor) => {
		const modelName = processor[0].toUpperCase() + processor.slice(1);
		interfaceNames.push(`${modelName}Message`);
		interfaces.push(`export interface ${modelName}Message extends GenericMessage<${modelName}> {
	type: "${processor}";
}`);
		imports.push(`import { ${modelName} } from "../definitions";`);
	});

	const fileContent = `import { GenericMessage } from "./GenericMessage";
${imports.join("\n")}

/**
* THIS IS A GENERATED FILE, DO NOT EDIT IT BY HAND.
*
* To update it, restart the build process.
*/
${interfaces.join("\n\n")}

export type Message =
	| ${interfaceNames.join("\n\t| ")};
`;

	fs.writeFileSync(`./src/models/Message.ts`, fileContent);
}

createProcessorsLoader("packet-processors", "packetProcessors", "processors", "PacketProcessor", "PacketProcessor");

createProcessorsLoader(
	"actor-control-packet-processors",
	"actorControlPacketProcessors",
	"processors/actor-control",
	"SuperPacketProcessor<ActorControl>",
	"SuperPacketProcessor",
	[`import { ActorControl } from "../definitions";`],
);

createProcessorsLoader(
	"result-dialog-packet-processors",
	"resultDialogPacketProcessors",
	"processors/result-dialog",
	"SuperPacketProcessor<ResultDialog>",
	"SuperPacketProcessor",
	[`import { ResultDialog } from "../definitions";`],
);

createMessageType();
