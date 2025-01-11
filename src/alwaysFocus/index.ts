import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: "\"WindowStore\"",
		replace: {
			match: /(?<=isFocused\(\){)/,
			replacement: "return!0;",
		},
	},
];
