import customConfig from '@repo/eslint-config/react-internal.js';

export default [
  {
    ignores: [
      "build/**",
      ".turbo/**",
      "node_modules/**"
    ]
  },
  ...customConfig
]