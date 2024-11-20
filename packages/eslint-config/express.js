const js = require("@eslint/js");
const plImport = require("eslint-plugin-import");
const prettier = require("eslint-plugin-prettier");
const importSort = require("eslint-plugin-simple-import-sort");
const turbo = require("eslint-plugin-turbo");
const unusedImports = require("eslint-plugin-unused-imports");
const tseslint = require("typescript-eslint");

const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = tseslint.config(
  {
    ignores: ["dist/", "node_modules", "*.js"],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    plugins: {
      import: plImport,
      prettier,
      "simple-import-sort": importSort,
      turbo,
      "unused-imports": unusedImports,
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
      "@typescript-eslint/array-type": [
        "error",
        {
          default: "generic",
          readonly: "generic",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
        },
      ],
      "@typescript-eslint/explicit-member-accessibility": 0,
      "@typescript-eslint/no-empty-function": 0,
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-unused-vars": 0,
      "@typescript-eslint/no-use-before-define": 0,

      // Basic
      "array-callback-return": "warn",
      "no-console": "warn",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-prototype-builtins": 0,
      // "no-expected-multiline": "warn", // can"t find rule definition

      "padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "*", next: "block" },
        { blankLine: "always", prev: "block", next: "*" },
        { blankLine: "always", prev: "*", next: "block-like" },
        { blankLine: "always", prev: "block-like", next: "*" },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              "^(?:os|path|http|fs|crypto|util|events|stream|url|zlib|querystring|tls|dgram|net|dns|child_process|cluster|readline|vm|assert|buffer|process|timers)(/.*)?$",
            ],
            ["^(?!(@(repo)*/|\\.\\./|\\./))"],
            ["^@repo/"],
            ["^@/"],
            ["^(?:\\./|\\.\\./|\\.)"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
);
