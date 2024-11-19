const js = require("@eslint/js");
const globals = require("globals");
const prettier = require("eslint-plugin-prettier");
const turbo = require("eslint-plugin-turbo");
const onlyWarn = require("eslint-plugin-only-warn");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh");
const importSort = require("eslint-plugin-simple-import-sort");
const tailwind = require("eslint-plugin-tailwindcss");
const tseslint = require("typescript-eslint");

const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 */

module.exports = tseslint.config(
  {
    ignores: ["dist/", "node_modules", "*.js"],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        React: true,
        JSX: true,
      },
    },
    plugins: {
      "only-warn": onlyWarn,
      prettier,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": importSort,
      tailwind,
      turbo,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project,
        },
      },
    },
    rules: {
      ...prettier.configs.recommended.rules,
      ...turbo.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...tailwind.configs["flat/recommended"].rules,
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      // "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }],
      "@typescript-eslint/no-empty-function": [
        "error",
        { allow: ["arrowFunctions"] },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
);
