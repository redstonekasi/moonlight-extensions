import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: "\"MaskedLinkStore\"",
		replace: {
			match: /(?<=isTrustedDomain\(\i\)\{)/,
			replacement: "return!0;",
		},
	},
	{
		find: "\"bitbucket.org\"",
		replace: {
			match: /(?<=function .\(.\){)(?=var)/,
			replacement: "return null;",
		},
	},
];
