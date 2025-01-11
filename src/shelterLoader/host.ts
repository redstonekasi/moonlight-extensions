import { ipcMain } from "electron";
import * as https from "node:https";
import * as path from "node:path";
import { promises as fs } from "original-fs";

const logger = moonlightHost.getLogger("shelter");

const sourceType = moonlightHost.getConfigOption<"remote" | "local">("shelterLoader", "sourceType") ?? "remote";
const sourcePath = moonlightHost.getConfigOption<string>("shelterLoader", "sourcePath")
	|| "https://raw.githubusercontent.com/uwu/shelter-builds/main/shelter.js";

logger.info(`Loading shelter from ${sourceType} "${sourcePath}"`);

let bundle: Promise<string>;
if (sourceType === "remote") {
	bundle = new Promise((resolve, reject) => {
		const req = https.get(sourcePath);

		req.on("response", (res) => {
			const chunks: Buffer[] = [];

			res.on("data", (chunk) => chunks.push(chunk));
			res.on("end", () => {
				let data = Buffer.concat(chunks).toString("utf8");

				if (!data.includes("//# sourceMappingURL=")) {
					data += `\n//# sourceMappingURL=${sourcePath + ".map"}`;
				}

				resolve(data);
			});
		});

		req.on("error", reject);
		req.end();
	});
}

ipcMain.handle("_shelter_getBundle", () => {
	if (bundle) return bundle;
	const resolved = path.resolve(sourcePath);
	return fs.readFile(resolved, "utf8").then((v) => v + `\n//# sourceMappingURL=file://${resolved}.map`);
});
