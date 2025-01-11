import { ExtensionWebExports } from "@moonlight-mod/types";

// TODO: that should be a normal number input

export const patches: ExtensionWebExports["patches"] = [
	{
		find: ":\"OVERLAY_SET_NOT_IDLE\"",
		replace: {
			match: /(?<=Date\.now\(\)-\i>)\i\.\i(?=\|\|)/,
			replacement: (c: string) => `(parseInt(moonlight.getConfigOption("customIdleTimeout","timeout"))||${c})`,
		},
	},
];
