import { Router } from "express";
import { eq, and } from "drizzle-orm";
import { extractKeyIdFromApiKey, API_PREFIX } from "@repo/shared";
import { db } from "../../db";
import { apiKeysTable, configsTable, projectsTable } from "../../db/schema";

const router = Router();


// Get "configs list" from project ID
router.get("/get", async (req, res) => {
  const body = req.body;
  const projectId = body.projectId;

  // if no PROJECT ID, then
  if (!projectId) {
    return res.status(400).json({
      error: "Missing PROJECT ID"
    })
  }

  const configs = await db
    .select()
    .from(configsTable)
    .where(eq(configsTable.projectId, projectId))

  return res.json(configs);
})


// Add new config
router.post("/create", async (req, res) => {
  const body = req.body;
  const projectId = body.projectId.trim()
  const key = body.key.trim()
  const value = body.value.trim()
  const env = body.env.trim()

  if (!projectId || !key || !value) {
    return res.status(400).json({
      error: "Missing required fields"
    })
  }

  // if no project, throw error
  const [project] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.projectId, projectId))
    .limit(1);

  if (!project) {
    return res.status(404).json({
      error: "Project with this PROJECT ID not found"
    })
  }

  // if project has already same named key present, then throw error
  const [config] = await db
    .select()
    .from(configsTable)
    .where(and(
      eq(configsTable.projectId, projectId),
      eq(configsTable.key, key),
      eq(configsTable.environment, env)
    ))

  if (config) {
    return res.status(409).json({
      error: "Config with same key for same Environment already present in this project"
    })
  }

  // inserted a new config and return it
  const [configInserted] = await db
    .insert(configsTable)
    .values({
      projectId,
      key,
      value,
      environment: env,
    })
    .returning()

  return res.status(200).json(configInserted);
})


// Delete config
router.delete("/:config_id", async (req, res) => {
  const { config_id } = req.params;

  const [deletedConfig] = await db
    .delete(configsTable)
    .where(eq(configsTable.id, config_id))
    .returning();

  if (!deletedConfig) {
    return res.status(404).json({
      error: "Config not present"
    })
  }

  return res.status(200).json(deletedConfig)
})


export const internalConfigsRoutes = router;