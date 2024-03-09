import { relations } from "drizzle-orm";
import { integer, smallint, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
  id: serial("id"),
  amount: integer("amount").notNull(),
  type: smallint("type").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  clientId: integer("client_id").notNull(),
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
  id: integer("id").notNull(),
  limit: integer("limit").notNull(),
  balance: integer("balance").notNull(),
});

export const clientsRelations = relations(clients, ({ many }) => ({
  transactions: many(clients, {
    relationName: "client_transactions",
  }),
}));

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
