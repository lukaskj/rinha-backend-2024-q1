import { config } from "dotenv";
config();

import { Pool } from "pg";
import * as schema from "./schema";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres/driver";

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  idleTimeoutMillis: 15000,
  ssl: false,
});

export const databaseService: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
