CREATE TABLE "portfolio" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"category" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"client" varchar(255),
	"challenge" text,
	"solution" text,
	"outcome" text,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cover" varchar(500) NOT NULL,
	"images" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"demo" varchar(500),
	"featured" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "portfolio_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"author_name" varchar(100) NOT NULL,
	"author_role" varchar(150),
	"author_image" text,
	"rating" integer DEFAULT 5 NOT NULL,
	"content" text NOT NULL,
	"service" varchar(100),
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;