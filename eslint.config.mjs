import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The new react-hooks v7 "set-state in effect" heuristic flags patterns
    // that are required here: SSR-safe localStorage hydration (language
    // selector), client-only clocks (cacheComponents forbids new Date() during
    // prerender), and IntersectionObserver feature-detection fallbacks.
    // Kept as warnings so they stay visible without failing the build.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
