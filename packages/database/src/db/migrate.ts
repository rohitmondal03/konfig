import { migrate } from "drizzle-orm/postgres-js/migrator"
import { db } from "../index"

async function main() {
  await migrate(db, {
    migrationsFolder: "./src/db/migrations",
  }).then(() => {
    console.log("Migration completed successfully");
    process.exit(0);
  }).catch((e) => {
    console.error("Migration failed", e);
    process.exit(1);
  })
}

main();
