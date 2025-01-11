export const getKeywords = () =>
	(moonlight.getConfigOption<string[]>("highlight", "keywords") ?? [])
		.map((w) => w.trim().toLowerCase())
		.filter(Boolean);

const whitespace = /\s/;
export function matchKeywords(source: string) {
	const keywords = getKeywords();

	for (const word of keywords) {
		const i = source.toLowerCase().indexOf(word);
		if (i === -1) continue;

		// Check that boundaries are present if needed.
		if (i !== 0 && !whitespace.test(source[i - 1])) continue;
		if (source.length > i + word.length && !whitespace.test(source[i + word.length])) continue;

		const start = source.substring(0, i);
		const end = source.substring(i + word.length);
		return [source, word, start, end];
	}

	return null;
}

export const shouldHighlight = (message: any, channelId: any) => matchKeywords(message.content) !== null;
