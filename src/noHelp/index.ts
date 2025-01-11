import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: "\"mod+shift+h\"",
		replace: {
			match: /,"f1"/,
			replacement: "",
		},
	},
];
