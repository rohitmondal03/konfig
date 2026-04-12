import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, apiKeysTable, projectsTable } from "@repo/db";
import {
  extractKeyIdFromApiKey,
  formatApiKey,
  generateApiKey
} from "@repo/shared";


const router = Router();


// Create a new Project, and also API KEY
router.post("/create", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Name is required for making a new project"
    })
  }

  const { keyHash, key, keyId } = await generateApiKey();

  const [project] = await db
    .insert(projectsTable)
    .values({ name })
    .returning();

  const [addedApiKey] = await db
    .insert(apiKeysTable)
    .values({
      projectId: project.projectId,
      keyId,
      keyHash,
    })
    .returning()

  return res.status(200).json({
    projectName: project.name,
    projectId: project.projectId,
    keyId: addedApiKey.keyId,
    apiKey: formatApiKey(keyId, key),
  });
});


// Get "project" from "API KEY"
router.get("/get", async (req, res) => {
  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res.status(400).json({
      error: "API KEY is required"
    })
  }

  const keyId = extractKeyIdFromApiKey(apiKey);

  const [apiKeyData] = await db
    .select()
    .from(apiKeysTable)
    .where(eq(apiKeysTable.keyId, keyId));

  if (!apiKeyData) {
    return res.status(403).json({
      error: "Invalid API KEY"
    })
  }

  const [project] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.projectId, apiKeyData.projectId));

  return res.status(200).json(project);
})


// Generate "new key for a project" , from project ID
router.post("/generate/:project_id", async (req, res) => {
  const { project_id } = req.params;

  // delete old API KEY of this project
  await db
    .delete(apiKeysTable)
    .where(eq(apiKeysTable.projectId, project_id));

  // Generate new API KEY, add to "api_keys table" and return it too
  const { key, keyHash, keyId } = await generateApiKey();

  const [newApiKey] = await db
    .insert(apiKeysTable)
    .values({
      projectId: project_id,
      keyId,
      keyHash,
    })
    .returning();

  return res.status(200).json({
    projectId: project_id,
    keyId: newApiKey.keyId,
    keyHash: newApiKey.keyHash,
    apiKey: formatApiKey(keyId, key),
  })
})


export const internalProjectsRoutes = router;