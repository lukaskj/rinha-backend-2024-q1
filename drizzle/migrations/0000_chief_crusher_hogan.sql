CREATE TABLE IF NOT EXISTS "client" (
	"id" integer NOT NULL,
	"limit" integer NOT NULL,
	"balance" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial NOT NULL,
	"amount" integer NOT NULL,
	"type" smallint NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"client_id" integer NOT NULL
);
