import { Router } from "express";
import { and, eq } from "drizzle-orm";
import { decryptText } from "@repo/shared";
import { db, schema } from "@repo/db";
import { authMiddleware } from "../../middleware/auth.middleware";


const router = Router();


// Get all project's configs OR from "key (out of key-value)"
// URL structure - /v1/public/configs?key="xxxxxcccc" OR /v1/public/configs
router.get("/configs", authMiddleware, async (req, res) => {
  const { key: configKey } = req.query as { key: string };
  const apiKeyData = req.apiKey;

  const configsTable = schema.configsTable;

  let configs = []

  // if no config key, then return all project's configs, else return only according to "key"
  if (!configKey) {
    configs = await db
      .select()
      .from(configsTable)
      .where(eq(configsTable.projectId, apiKeyData.projectId));
  }
  configs = await db
    .select({
      key: configsTable.key,
      value: configsTable.value,
      environment: configsTable.environment,
    })
    .from(configsTable)
    .where(and(
      eq(configsTable.projectId, apiKeyData.projectId),
      eq(configsTable.key, configKey)
    ))
    .limit(2);

  if (!configs) {
    return res.status(404).json({
      error: "Config not found"
    })
  }

  const configsWithDecryptedValue = configs.map(con => ({
    key: con.key,
    value: decryptText(con.value),
    environment: con.environment,
  }))

  return res.status(200).json(configsWithDecryptedValue);
})


export const publicConfigsRoutes = router;