import { Config } from "tailwindcss";

declare module "@repo/design-system/tailwind.config" {
  declare const config: Config;
  export default config;
}
