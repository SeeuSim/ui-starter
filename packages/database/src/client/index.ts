import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { dbConfig } from "@repo/db/config";

const queryClient = postgres({
  ...dbConfig,
});

export const client = drizzle(queryClient);
