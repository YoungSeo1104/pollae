// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

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
    // 디자인 원본 JSX — 빌드 대상 아님(브라우저 Babel 로드용 프로토타입).
    "design/**",
    // Storybook 정적 빌드 산출물.
    "storybook-static/**",
  ]),
  ...storybook.configs["flat/recommended"]
]);

export default eslintConfig;
