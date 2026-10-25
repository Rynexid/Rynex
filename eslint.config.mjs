import nextPlugin from "@next/eslint-plugin-next";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@next/next": nextPlugin,
      "simple-import-sort": simpleImportSort,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/heading-has-content": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      "jsx-a11y/anchor-has-content": "warn",
    },
  },
];
