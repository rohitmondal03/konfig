ALTER TABLE "api_keys" DROP CONSTRAINT "api_keys_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "configs" DROP CONSTRAINT "configs_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "project_id" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_project_id_unique" UNIQUE("project_id");--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_project_id_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("project_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "configs" ADD CONSTRAINT "configs_project_id_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("project_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_project_id_projects_table" ON "projects" USING btree ("project_id");