import { addRule } from "@moonlight-mod/wp/markdown_markdown";

addRule("highlightHighlight", () => ({
	order: -1,
	match(source, state) {
		const words = moonlight.getConfigOption<string[]>("highlight", "keywords") ?? [];

		for (const word of words) {
			const normalized = word.trim().toLowerCase();
			const i = source.toLowerCase().indexOf(normalized);
			if (i === -1) continue;
			const start = source.substring(0, i);
			const end = source.substring(i + normalized.length);
			return [source, normalized, start, end];
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
