CREATE TABLE IF NOT EXISTS "client" (
	"id" integer,
	"cur_limit" integer,
	"initial_balance" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial NOT NULL,
	"amount" integer,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"client_id" integer
);
