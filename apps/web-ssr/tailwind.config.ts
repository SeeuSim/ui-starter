import type { Config } from "tailwindcss";

import baseConfig from "@repo/design-system/tailwind.config";

const projectContentPath = "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}";
const originalContentConfig = baseConfig.content;
const content = Array.isArray(originalContentConfig)
  ? [...originalContentConfig, projectContentPath]
  : {
      ...originalContentConfig,
      files: [...originalContentConfig.files, projectContentPath],
    };

export default {
  ...baseConfig,
  content,
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
      fontFamily: {
        ...baseConfig.theme?.extend?.fontFamily,
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
