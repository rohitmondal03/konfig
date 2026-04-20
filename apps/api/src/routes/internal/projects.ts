import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, schema } from "@repo/db";
import {
  extractKeyIdFromApiKey,
  formatApiKey,
  generateApiKey
} from "@repo/shared";
import { projectsTable } from "@repo/db/src/db/schema";


const router = Router();


// Create a new Project, and also API KEY
// API - "/projects/create"
router.post("/create", async (req, res) => {
  const { name, description } = req.body;
  const userId = req.headers.authorization;

  if (!userId) {
    return res.status(401).json({ error: "Session not available !" });
  }

  if (!name) {
    return res.status(400).json({
      error: "Name is required for making a new project"
    })
  }

  const { keyHash, key, keyId } = await generateApiKey();

  const [project] = await db
    .insert(schema.projectsTable)
    .values({ name, description, userId })
    .returning();

  const [addedApiKey] = await db
    .insert(schema.apiKeysTable)
    .values({
      projectId: project.projectId,
      keyId,
      keyHash,
    })
    .returning()

  return res.status(200).json({
    projectId: project.projectId,
    projectName: project.name,
    projectDesc: project.description,
    keyId: addedApiKey.keyId,
    apiKey: formatApiKey(keyId, key),
  });
});


// Get user's all projects
// API = "projects/get-all-projects"
router.get("/get-all-projects", async (req, res) => {
  const userId = req.headers.authorization;

  if (!userId) {
    return res.status(401).json({ error: "Session not available " });
  }

  const usersProjects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.userId, userId));

  // json will have an array 
  return res.status(200).json(usersProjects.map(p => ({
    projectId: p.projectId,
    projectName: p.name,
    projectDescription: p.description,
    createdAt: p.createdAt,
  })))
})


// Get "project" from "API KEY"
// API - "/projects/get"
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
    .from(schema.apiKeysTable)
    .where(eq(schema.apiKeysTable.keyId, keyId));

  if (!apiKeyData) {
    return res.status(403).json({
      error: "Invalid API KEY"
    })
  }

  const [project] = await db
    .select()
    .from(schema.projectsTable)
    .where(eq(schema.projectsTable.projectId, apiKeyData.projectId));

  return res.status(200).json(project);
})


// Generate "new key for a project" , from project ID
// API - "/projects/generate/:project_id"
router.post("/generate/:project_id", async (req, res) => {
  const { project_id } = req.params;

  // delete old API KEY of this project
  await db
    .delete(schema.apiKeysTable)
    .where(eq(schema.apiKeysTable.projectId, project_id));

  // Generate new API KEY, add to "api_keys table" and return it too
  const { key, keyHash, keyId } = await generateApiKey();

  const [newApiKey] = await db
    .insert(schema.apiKeysTable)
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