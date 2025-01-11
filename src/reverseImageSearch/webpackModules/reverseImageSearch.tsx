import { addItem, MenuItem } from "@moonlight-mod/wp/contextMenu_contextMenu";
import React from "@moonlight-mod/wp/react";

function patch(props: any) {
	const source: string = props.mediaItem?.url || props.target?.href || props.target?.src;
	if (!source) return;

	const services = Object.entries(moonlight.getConfigOption("reverseImageSearch", "services") ?? {});
	const entries = services.map(([name, url]) => (
		<MenuItem
			id={`reverse-image-search-${name}`}
			label={name}
			action={() => {
				window.open(url.replace("%s", encodeURIComponent(source)));
			}}
		/>
	));

	return (
		<MenuItem id="reverse-image-search" label="Search image">
			{entries}
		</MenuItem>
	) as any; // TODO: types are wrong here
}

addItem("message", patch, "save-image");
addItem("image-context", patch, "save-image");
