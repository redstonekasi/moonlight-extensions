import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: "id:\"invite-to-server\"",
		replace: {
			match: /(?<=function \i\(\i\){)(?=let{user:\i,guildId:)/,
			replacement: "return null;",
		},
	},
];
