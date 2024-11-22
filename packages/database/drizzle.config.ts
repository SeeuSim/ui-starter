import { defineConfig } from "drizzle-kit";

import { dbConfig } from "@repo/db/src/config";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: dbConfig,
});
