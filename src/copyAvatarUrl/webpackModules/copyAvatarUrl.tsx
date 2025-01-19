import { addItem, MenuItem } from "@moonlight-mod/wp/contextMenu_contextMenu";
import React from "@moonlight-mod/wp/react";

const GuildMemberStore = require("discord/stores/GuildMemberStore").default;
const UserStore = require("discord/stores/UserStore").default;
const AvatarUtils = require("discord/utils/AvatarUtils").default;
const { copy } = require("discord/utils/ClipboardUtils");

addItem("user-context", (props: any) => {
	// these are actually different wtf
	const user = UserStore.getUser(props.user.id);

	const avatar = AvatarUtils.getUserAvatarURL(user, true, 1024, "png");
	const children = [];

	if (user.banner) {
		const bannerUrl = AvatarUtils.getUserBannerURL({
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
		const guildAvatar = AvatarUtils.getGuildMemberAvatarURLSimple({
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
		const bannerUrl = AvatarUtils.getGuildMemberBannerURL({
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
