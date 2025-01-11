import { matchKeywords } from "@moonlight-mod/wp/highlight_highlight";
import { addRule, blacklistFromRuleset } from "@moonlight-mod/wp/markdown_markdown";

addRule("highlightHighlight", (rules) => ({
	order: -1,
	match: matchKeywords,
	parse(capture, parse, state) {
		return [
			parse(capture[2], state),
			{ type: "highlight", content: capture[1] },
			parse(capture[3], state),
		];
	},
}), () => ({ type: "skip" }));

blacklistFromRuleset("INLINE_REPLY_RULES", "highlightHighlight");
blacklistFromRuleset("EMBED_TITLE_RULES", "highlightHighlight");
