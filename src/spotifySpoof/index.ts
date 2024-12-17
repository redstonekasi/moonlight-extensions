import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
  {
    find: '"displayName","SpotifyStore"',
    replace: {
      match: /(?<=isPremium=)/,
      replacement: "true,"
    },
  },
  {
    find: '"displayName","SpotifyStore"',
    replace: {
      match: /(?<=function .+?\(\){)if\(null==.\)return;.+?"Playback auto paused"\)/,
      replacement: ""
    },
  }
];
