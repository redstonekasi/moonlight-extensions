import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: "discord/modules/spotify/SpotifyStore",
		replace: [
			{
				match: /(?<=isPremium=)/,
				replacement: "true,",
			},
			{
				match: /(?<=function \i\(\){)if\(null==\i\)return;.+?"Playback auto paused"\)/,
				replacement: "",
			},
		],
	},
];
