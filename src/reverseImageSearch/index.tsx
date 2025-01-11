import { ExtensionWebExports } from "@moonlight-mod/types";

export const webpackModules: ExtensionWebExports["webpackModules"] = {
	reverseImageSearch: {
		dependencies: [
			{ ext: "contextMenu", id: "contextMenu" },
			{ id: "react" },
		],
		entrypoint: true,
	},
};
