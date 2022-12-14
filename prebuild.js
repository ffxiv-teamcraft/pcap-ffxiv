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

	const loader = `import { ${processorTypeName} } from "../models";
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

function generateInterfaces(processors, parentInterfaceName, excludeImports) {
	const entries = [];

	parentInterfaceName = parentInterfaceName || "";
	const parentProcessorName = parentInterfaceName
		? parentInterfaceName[0].toLowerCase() + parentInterfaceName.slice(1)
		: null;

	// Then actorControl packets
	processors.forEach((processor) => {
		const modelName = processor[0].toUpperCase() + processor.slice(1);
		const subTypeField = parentProcessorName ? `\n\tsubType: "${processor}";` : "";
		const entry = {
			name: `${parentInterfaceName}${modelName}Message`,
			importString: `import { ${modelName} } from "../definitions";`,
			interfaceString: `export interface ${parentInterfaceName}${modelName}Message extends GenericMessage<${modelName}> {
	type: "${parentProcessorName || processor}";${subTypeField}
}`,
		};
		if (excludeImports) {
			delete entry.importString;
		}
		entries.push(entry);
	});

	return entries;
}

function createMessageType() {
	const { processors } = generateImportsAndProcessors("processors");
	const actorControlProcessors = generateImportsAndProcessors("processors/actor-control").processors;
	const eventResumeProcessors = generateImportsAndProcessors("processors/event-resume").processors;

	const entries = [
		...generateInterfaces(processors),
		...generateInterfaces(actorControlProcessors, "ActorControl"),
		...generateInterfaces(actorControlProcessors, "ActorControlSelf", true),
		...generateInterfaces(actorControlProcessors, "ActorControlTarget", true),
		...generateInterfaces(eventResumeProcessors, "EventResume"),
	];

	const fileContent = `import { GenericMessage } from "./GenericMessage";
${entries
	.filter((e) => e.importString)
	.map((e) => e.importString)
	.join("\n")}

/**
* THIS IS A GENERATED FILE, DO NOT EDIT IT BY HAND.
*
* To update it, restart the build process.
*/
${entries.map((e) => e.interfaceString).join("\n\n")}

export type Message =
	| ${entries.map((e) => e.name).join("\n\t| ")};
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
	"event-resume-packet-processors",
	"eventResumePacketProcessors",
	"processors/event-resume",
	"SuperPacketProcessor<EventResume>",
	"SuperPacketProcessor",
	[`import { EventResume } from "../definitions";`],
);

createMessageType();
