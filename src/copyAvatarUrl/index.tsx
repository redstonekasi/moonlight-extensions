import { ExtensionWebExports } from "@moonlight-mod/types";

export const webpackModules: ExtensionWebExports["webpackModules"] = {
	copyAvatarUrl: {
		dependencies: [
			{ ext: "contextMenu", id: "contextMenu" },
			{ id: "discord/stores/UserStore" },
			{ id: "discord/stores/GuildMemberStore" },
			{ id: "discord/utils/AvatarUtils" },
			{ id: "discord/utils/ClipboardUtils" },
			{ id: "react" },
		],
		entrypoint: true,
	},
};
