import { pgTable, text, uuid, index, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./auth-schema";

export const CONFIG_ENVIRONMENT_ENUM = pgEnum("CONFIG_ENVIRONMENT_ENUM", ["production", "development"])

export const projectsTable = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").defaultRandom().unique().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  userId: text("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("idx_project_id_projects_table").on(table.projectId)
])

export const apiKeysTable = pgTable("api_keys", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projectsTable.projectId, { onDelete: "cascade" }),
  keyId: text("key_id").notNull(),
  keyHash: text("key_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index("idx_project_id_api_keys_table").on(table.projectId),
  index("idx_key_id_api_keys_table").on(table.keyId),
])

export const configsTable = pgTable("configs", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projectsTable.projectId, { onDelete: "cascade" }),
  key: text("key").notNull(),
  value: text("value").notNull(),
  environment: CONFIG_ENVIRONMENT_ENUM("environment").notNull().default("development"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("idx_project_id_configs_table").on(table.projectId),
])