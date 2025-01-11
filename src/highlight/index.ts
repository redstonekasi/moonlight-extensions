import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{ // Allow ignoring DND and Focus Mode status
		find: "NotificationTextUtils",
		replace: [{
			match: /(?<=ignoreStatus:)\i/,
			replacement: (_) =>
				`${_}||(require("highlight_highlight").shouldHighlight(arguments[0],arguments[1])&&moonlight.getConfigOption("highlight","ignoreFocusMode"))`,
		}],
	},
	{ // Make messages appear mentioned
		find: "}isFirstMessageInForumPost(",
		replace: [{
			match: /(?<=this\.mentioned=.+?)(?=})/,
			replacement:
				",this.mentioned=this.mentioned||require(\"highlight_highlight\").shouldHighlight(this,this.channel_id)",
		}],
	},
	{ // This takes care of ReadStateStore, manual ack and notifications.
		find: "=!1,suppressRoles:",
		replace: [{
			match: /(?<=let{(?:message|rawMessage):(.)[^}]+}=.;return )/g,
			replacement: (_, msg) => `require("highlight_highlight").shouldHighlight(${msg},${msg}.channelId)||`,
		}],
	},
];

export const webpackModules: ExtensionWebExports["webpackModules"] = {
	highlight: {},
	markdown: {
		dependencies: [{ ext: "markdown", id: "markdown" }],
		entrypoint: true,
	},
};
