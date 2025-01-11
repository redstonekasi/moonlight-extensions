export function shouldHighlight(message: any, channelId: any) {
	const words = moonlight.getConfigOption<string[]>("highlight", "keywords") ?? [];
	return words.some((w) => message.content.toLowerCase().includes(w.trim().toLowerCase()));
}
