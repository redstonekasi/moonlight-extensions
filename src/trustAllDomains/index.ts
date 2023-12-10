import { ExtensionWebExports } from "@moonlight-mod/types";

export const patches: ExtensionWebExports["patches"] = [
  {
    find: 'displayName="MaskedLinkStore"',
    replace: {
      match: /(?<=isTrustedDomain\(\i\)\{)/,
      replacement: "return!0;"
    }
  },
  {
    find: "isSuspiciousDownload:",
    replace: {
      match: /(?<=function .\(.\){)(?=var)/,
      replacement: "return null;"
    }
  }
];
