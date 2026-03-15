import { Router } from "express";
import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { apiKeysTable, configsTable } from "../../db/schema";
import { authMiddleware } from "../../middleware/auth.middleware";
import { AUTH_HEADER_PREFIX } from "@repo/shared";


const router = Router();


// Get configs from "key (out of key-value)"
// URL structure - /configs/v1?key="xxxxxcccc"
router.get("/configs", authMiddleware, async (req, res) => {
  const { key: configKey } = req.query as { key: string };
  const apiKeyData = req.apiKey;

  if (!configKey) {
    return res.status(400).json({
      error: "Config's Key is required"
    })
  }

  const configs = await db
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

  return res.status(200).json(configs);
})


export const publicConfigsRoutes = router;