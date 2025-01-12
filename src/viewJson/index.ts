import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
	{
		find: ".openFullPreviewSection,",
		replace: {
			match: /(?=function (\i)\(\i\){let{url:\i,fileName:\i,fileSize:\i,transitionState:\i,language:\i)/,
			replacement: (_, functionName) => `exports.__viewJsonFilePreviewModal=${functionName};`,
		},
	},
];

export const webpackModules: ExtensionWebExports["webpackModules"] = {
	viewJson: {
		dependencies: [
			{ ext: "contextMenu", id: "contextMenu" },
			{ ext: "spacepack", id: "spacepack" },
			{ id: "react" },
			{ id: "discord/utils/ClipboardUtils" },
			{ id: "discord/components/common/index" },
			".openFullPreviewSection,",
		],
		entrypoint: true,
	},
};
