import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { dbConfig } from "@repo/db/config";

const migrationConnection = postgres({ ...dbConfig, max: 1 });

const db = drizzle(migrationConnection);

const main = async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
  await migrationConnection.end();
};

void main();
