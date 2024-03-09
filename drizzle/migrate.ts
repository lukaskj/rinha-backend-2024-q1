import * as dotenv from "dotenv";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres/driver";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { __pool } from "./connect";
import { join } from "node:path";
dotenv.config();

async function migrattion() {
  const pool = __pool();

  const db: NodePgDatabase = drizzle(pool);

  console.log("Migrating...");

  try {
    console.log({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
    });
    await migrate(db, { migrationsFolder: join(__dirname, "migrations") });
  } finally {
    await pool.end();
  }
}

migrattion();
