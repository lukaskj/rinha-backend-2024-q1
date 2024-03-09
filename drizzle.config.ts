import { config } from "dotenv";
import type { Config } from "drizzle-kit";
config();

export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  verbose: true,
  // strict: true,
} satisfies Config;
