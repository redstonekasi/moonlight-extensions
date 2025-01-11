import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: "canStreamQuality:",
		replace: {
			match: /(?<=canStreamQuality:).{1,2}?(?=,)/,
			replacement: "()=>!0",
		},
	},
];
