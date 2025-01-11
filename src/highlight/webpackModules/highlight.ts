export const getKeywords = () =>
	(moonlight.getConfigOption<string[]>("highlight", "keywords") ?? [])
		.map((w) => w.trim().toLowerCase())
		.filter(Boolean);

export const shouldHighlight = (message: any, channelId: any) =>
	getKeywords().some((w) => message.content.toLowerCase().includes(w));
