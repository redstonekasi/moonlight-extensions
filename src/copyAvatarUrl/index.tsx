import { ExtensionWebExports } from "@moonlight-mod/types";

export const webpackModules: ExtensionWebExports["webpackModules"] = {
  copyAvatarUrl: {
    dependencies: [
      { ext: "contextMenu", id: "contextMenu" },
      { ext: "spacepack", id: "spacepack" },
      { ext: "common", id: "react" },
      { ext: "common", id: "stores" },
    ],
    entrypoint: true,
    run: (module, exports, require) => {
      const spacepack = require("spacepack_spacepack").default;
      const React = require("common_react");
      const { addItem, MenuItem } = require("contextMenu_contextMenu");
      const stores = require("common_stores");

      const {
        getUserAvatarURL,
        getUserBannerURL,
        getGuildMemberAvatarURLSimple,
        getGuildMemberBannerURL,
      } = spacepack.findByExports("getUserAvatarURL")[0].exports;
      const { copy } = spacepack.findByCode('document.queryCommandEnabled("copy")')[0].exports;

      addItem("user-context", (props: any) => {
        // these are actually different wtf
        const user = stores.UserStore.getUser(props.user.id);

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
            <MenuItem id="cau-banner" label="Banner URL" action={() => copy(bannerUrl)} />
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
            <MenuItem id="cau-avatar-guild" label="Guild avatar URL" action={() => copy(guildAvatar)} />
          );
        }

        const member = stores.GuildMemberStore.getMember(props.guildId, user.id);
        if (member?.banner) {
          const bannerUrl = getGuildMemberBannerURL({
            id: user.id,
            guildId: props.guildId,
            banner: member.banner,
            canAnimate: true,
            size: 1024,
          });
          children.push(
            <MenuItem id="cau-banner-guild" label="Guild banner URL" action={() => copy(bannerUrl)} />
          );
        }
        
        return (
          <MenuItem id="copy-avatar-url" label="Copy ...">
            <MenuItem id="cau-avatar" label="Avatar URL" action={() => copy(avatar)} />
            {...children}
          </MenuItem>
        );
      }, "user-profile");
    }
  }
}
