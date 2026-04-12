import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js"
import { config } from "dotenv";

config({ path: "../../../.env" }); // Load from monorepo root
config(); // Fallback to current directory .env if it exists

const DB_URL = process.env.DATABASE_URL!;

const client = postgres(DB_URL, {
  prepare: false,
  ssl: "require",
})

export const db = drizzle(client);