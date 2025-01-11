import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: ":\"EXPAND_ROLES\"",
		replace: { // remove condition on return for layout calc
			match: /(?<=\.useLayoutEffect\(\(\)=>{)if\(.\)/,
			replacement: "",
		},
	},
	{
		find: ":\"EXPAND_ROLES\"",
		replace: { // if above ever fails, here's an extremely specific patch
			match: /(?<=roles:(.).+?)\[(.),(.)\]=.\.useState\(!1\)(?=.+?\2\?\1)/,
			replacement: (_1, _2, value, setter) => `${value}=false,${setter}=()=>{}`,
		},
	},
];
