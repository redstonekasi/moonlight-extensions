import { addItem, MenuItem } from "@moonlight-mod/wp/contextMenu_contextMenu";
import { CopyIcon, openModal, PaperIcon } from "@moonlight-mod/wp/discord/components/common/index";
import { copy } from "@moonlight-mod/wp/discord/utils/ClipboardUtils";
import React from "@moonlight-mod/wp/react";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";

const FilePreviewModal = spacepack.findByCode(".openFullPreviewSection,")[0].exports.__viewJsonFilePreviewModal;

const mapping: Record<string, string> = {
	"message": "Message",
	"user": "User",
	"guild": "Server",
	"channel": "Channel",
};
const keys = Object.keys(mapping);

function patch(props: any) {
	const children: any[] = [];
	for (const key of keys) {
		const obj = props[key];
		if (!obj) continue;

		const id = obj.id;
		const stringified = () => JSON.stringify(props[key].toJS(), null, 4);

		children.push(
			<MenuItem
				id={`view-json-view-${id}`}
				label={`View ${mapping[key]} JSON`}
				icon={PaperIcon}
				action={() => {
					const json = stringified();
					openModal((modalProps) => (
						<FilePreviewModal
							{...modalProps}
							url={"about:blank"}
							fileName={`${obj.id}.json`}
							fileSize={json.length}
							fileContents={json}
							language="json"
							bytesLeft={0}
						/>
					));
				}}
			/>,
			<MenuItem
				id={`view-json-copy-${id}`}
				label={`Copy ${mapping[key]} JSON`}
				icon={CopyIcon}
				action={() => copy(stringified())}
			/>,
		);
	}

	if (!children.length) return null;
	return (
		<MenuItem id="view-json" label="JSON...">
			{children}
		</MenuItem>
	);
}

addItem("message", patch as any, /^devmode-copy-id/ as any, true);
addItem("user-context", patch as any, /^devmode-copy-id/ as any, true);
addItem("guild-context", patch as any, /^devmode-copy-id/ as any, true);
addItem("channel-context", patch as any, /^devmode-copy-id/ as any, true);
