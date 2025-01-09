import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
  // {
  // find: 'type:"WINDOW_RESIZED"',
  // replace: {
  //   match: /(?<=focused:)\i/,
  //   replacement: "!0"
  // },
  {
    find: '"WindowStore"',
    replace: {
      match: /(?<=isFocused\(\){)/,
      replacement: "return!0;",
    },
  },
];
