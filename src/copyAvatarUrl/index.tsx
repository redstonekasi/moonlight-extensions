import { ExtensionWebExports } from "@moonlight-mod/types";

export const webpackModules: ExtensionWebExports["webpackModules"] = {
	copyAvatarUrl: {
		dependencies: [
			{ ext: "contextMenu", id: "contextMenu" },
			{ ext: "spacepack", id: "spacepack" },
			{ id: "react" },
			{ id: "discord/stores/UserStore" },
			{ id: "discord/stores/GuildMemberStore" },
		],
		entrypoint: true,
	},
};
