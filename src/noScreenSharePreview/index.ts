import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
  {
    find: '"ApplicationStreamPreviewUploadManager"',
    replace: {
      match: /(?<=\.default=)/,
      replacement: "{init(){}},"
    }
  }
];
