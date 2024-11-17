import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importSort from 'eslint-plugin-simple-import-sort';
import tailwind from 'eslint-plugin-tailwindcss';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      'simple-import-sort': importSort,
      tailwind: tailwind,
    },
    rules: {
      ...prettier.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...tailwind.configs['flat/recommended'].rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^(?:os|path|http|fs|crypto|util|events|stream|url|zlib|querystring|tls|dgram|net|dns|child_process|cluster|readline|vm|assert|buffer|process|timers)(/.*)?$',
            ],
            ['^(?!(@/|\\.\\./|\\./))'],
            ['^@/'],
            ['^(?:\\./|\\.\\./|\\.)'],
          ],
        },
      ],
    },
  }
);
