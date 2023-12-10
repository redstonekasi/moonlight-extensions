import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
  {
    find: "CallIdleManager:",
    replace: {
      match: /(?<=CallIdleManager:{actions:)\[.+?\]/,
      replacement: "[]"
    }
  }
];
