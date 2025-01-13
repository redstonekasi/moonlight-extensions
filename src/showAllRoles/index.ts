import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: ":\"EXPAND_ROLES\"",
		replace: [{ // always calc list
			match: /(?<=useLayoutEffect\(\(\)=>{if\()\i/,
			replacement: "!1",
		}, { // always expand
			match: /(?<=\i\.useState\()!1(?=\))/,
			replacement: "!0",
		}, { // hide button
			match: /\i.length<\i.length(?=\?)/,
			replacement: "!1",
		}],
	},
];
