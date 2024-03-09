import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres/driver";
import { __pool } from "./connect";
import * as schema from "../src/database/schema";

async function seed() {
  const pool = __pool();

  const client1: schema.NewClient = {
    id: 1,
    initialBalance: 0,
    curLimit: 100000,
  };

  const client2: schema.NewClient = {
    id: 2,
    initialBalance: 0,
    curLimit: 80000,
  };

  const client3: schema.NewClient = {
    id: 3,
    initialBalance: 0,
    curLimit: 1000000,
  };

  const client4: schema.NewClient = {
    id: 4,
    initialBalance: 0,
    curLimit: 10000000,
  };

  const client5: schema.NewClient = {
    id: 5,
    initialBalance: 0,
    curLimit: 500000,
  };

  const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
  await db.insert(schema.clients).values([client1, client2, client3, client4, client5]);

  await pool.end();
}

seed();
