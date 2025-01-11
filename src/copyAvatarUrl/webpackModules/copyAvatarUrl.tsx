import { addItem, MenuItem } from "@moonlight-mod/wp/contextMenu_contextMenu";
import React from "@moonlight-mod/wp/react";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";

const UserStore = require("discord/stores/UserStore").default;
const GuildMemberStore = require("discord/stores/GuildMemberStore").default;

const {
	getUserAvatarURL,
	getUserBannerURL,
	getGuildMemberAvatarURLSimple,
	getGuildMemberBannerURL,
} = spacepack.findByExports("getUserAvatarURL")[0].exports.ZP;
const copy: any =
	Object.values(spacepack.findByCode("document.queryCommandEnabled(\"copy\")")[0].exports).filter((t) =>
		typeof t === "function"
	)[0];

addItem("user-context", (props: any) => {
	// these are actually different wtf
	const user = UserStore.getUser(props.user.id);

	const avatar = getUserAvatarURL(user, true, 1024, "png");
	const children = [];

	if (user.banner) {
		const bannerUrl = getUserBannerURL({
			id: user.id,
			banner: user.banner,
			canAnimate: true,
			size: 1024,
		});
		children.push(
			<MenuItem id="cau-banner" label="Banner URL" action={() => copy(bannerUrl)} />,
		);
	}

	if (user.hasAvatarForGuild(props.guildId)) {
		const guildAvatar = getGuildMemberAvatarURLSimple({
			guildId: props.guildId,
			userId: user.id,
			avatar: user.guildMemberAvatars[props.guildId],
			canAnimate: true,
			size: 1024,
		});
		children.push(
			<MenuItem id="cau-avatar-guild" label="Guild avatar URL" action={() => copy(guildAvatar)} />,
		);
	}

	const member = GuildMemberStore.getMember(props.guildId, user.id);
	if (member?.banner) {
		const bannerUrl = getGuildMemberBannerURL({
			id: user.id,
			guildId: props.guildId,
			banner: member.banner,
			canAnimate: true,
			size: 1024,
		});
		children.push(
			<MenuItem id="cau-banner-guild" label="Guild banner URL" action={() => copy(bannerUrl)} />,
		);
	}

	return (
		<MenuItem id="copy-avatar-url" label="Copy ...">
			<MenuItem id="cau-avatar" label="Avatar URL" action={() => copy(avatar)} />
			{...children}
		</MenuItem>
	) as any; // TODO: types are wrong here
}, "user-profile");
