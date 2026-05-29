import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: "canStreamQuality:",
		replace: {
			match: /(?<=canStreamQuality:)(function.+?},)/,
			replacement: "()=>!0,",
		},
	},
];
