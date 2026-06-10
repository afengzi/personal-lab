import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Exported design prototype bundle — reference only, not our source.
    "design-src/**",
    // Remotion promo video — standalone package with its own toolchain (gitignored).
    "video/**",
    // Docs — specs and plans, not lintable source.
    "docs/**",
  ]),
]);

export default eslintConfig;
