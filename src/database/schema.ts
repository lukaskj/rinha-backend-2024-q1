import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
  id: serial("id"),
  amount: integer("amount"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  clientId: integer("client_id"),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  client: one(clients, {
    relationName: "transactions_client",
    fields: [transactions.clientId],
    references: [clients.id],
  }),
}));

export type Transactions = typeof transactions.$inferSelect;
export type NewTransactions = typeof transactions.$inferInsert;

export const clients = pgTable("client", {
  id: integer("id"),
  curLimit: integer("cur_limit"),
  initialBalance: integer("initial_balance"),
});

export const clientsRelations = relations(clients, ({ many }) => ({
  transactions: many(clients, {
    relationName: "client_transactions",
  }),
}));

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
