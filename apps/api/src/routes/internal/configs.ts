import { Router } from "express";
import { eq, and } from "drizzle-orm";
import { decryptText, encryptText } from "@repo/shared";
import { db, configsTable, projectsTable } from "@repo/db";

const router = Router();


// Get all "configs" from project ID
router.get("/get/:project_id", async (req, res) => {
  const { project_id: projectId } = req.params;

  // if no PROJECT ID, then
  if (!projectId) {
    return res.status(400).json({
      error: "Missing PROJECT ID"
    })
  }

  const configs = await db
    .select({
      key: configsTable.key,
      value: configsTable.value,
      environment: configsTable.environment,
    })
    .from(configsTable)
    .where(eq(configsTable.projectId, projectId))

  const configsWithDecryptedValues = configs.map(config => ({
    ...config,
    value: decryptText(config.value)
  }));

  return res.json(configsWithDecryptedValues);
})


// Add new config
router.post("/create", async (req, res) => {
  const body = req.body as {
    projectId: string,
    key: string,
    value: string,
    env: "production" | "development"
  };
  const projectId = body.projectId.trim();
  const key = body.key.trim();
  const value = body.value.trim();
  const env = body.env;

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
      value: encryptText(value),
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