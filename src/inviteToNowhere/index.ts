import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: "id:\"invite-to-server\"",
		replace: {
			match: /(?<=function\(\){return )\i/,
			replacement: "()=>null",
		},
	},
];
