import { getKeywords } from "@moonlight-mod/wp/highlight_highlight";
import { addRule } from "@moonlight-mod/wp/markdown_markdown";

addRule("highlightHighlight", () => ({
	order: -1,
	match(source, state) {
		const keywords = getKeywords();

		for (const word of keywords) {
			const i = source.toLowerCase().indexOf(word);
			if (i === -1) continue;
			const start = source.substring(0, i);
			const end = source.substring(i + word.length);
			return [source, word, start, end];
		}

		return null;
	},
	parse(capture, parse, state) {
		return [
			parse(capture[2], state),
			{ type: "highlight", content: capture[1] },
			parse(capture[3], state),
		];
	},
}), () => ({ type: "skip" }));
