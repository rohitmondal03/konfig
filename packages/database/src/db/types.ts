import { InferInsertModel, InferSelectModel, } from "drizzle-orm";
import { apiKeysTable, configsTable, projectsTable } from "./schema/schema";

export type TProject = InferSelectModel<typeof projectsTable>
export type TApiKey = InferSelectModel<typeof apiKeysTable>
export type TConfig = InferSelectModel<typeof configsTable>

export type TInsertProject = InferInsertModel<typeof projectsTable>
export type TInsertApiKey = InferInsertModel<typeof apiKeysTable>
export type TInsertConfig = InferInsertModel<typeof configsTable>