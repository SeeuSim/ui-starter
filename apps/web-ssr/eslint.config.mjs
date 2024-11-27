import customConfig from '@repo/eslint-config/react-internal.js';

export default [
  {
    ignores: [
      "build/**",
      ".react-router/**",
      ".turbo/**",
      "node_modules/**"
    ]
  },
  ...customConfig
]