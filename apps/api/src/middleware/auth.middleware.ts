import { NextFunction, Request, Response, RequestHandler } from "express";
import { eq } from "drizzle-orm";
import {
  AUTH_HEADER_PREFIX,
  compareKeyWithHash,
  extractKeyFromApiKey,
  extractKeyIdFromApiKey,
} from "@repo/shared";
import { db } from "@repo/db";
import { apiKeysTable } from "@repo/db";


export const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(400).json({
      error: "API KEY is required"
    })
  }

  const apiKey = authHeader.replace(AUTH_HEADER_PREFIX, "").trim()
  const apiKeyId = extractKeyIdFromApiKey(apiKey);
  const apiKeySecret = extractKeyFromApiKey(apiKey)

  const [apiKeyData] = await db
    .select()
    .from(apiKeysTable)
    .where(eq(apiKeysTable.keyId, apiKeyId))
    .limit(1);

  const isCorrectKey = await compareKeyWithHash(apiKeySecret, apiKeyData.keyHash)

  if (!apiKeyData || !isCorrectKey) {
    return res.status(403).json({
      error: "Invalid API KEY"
    })
  }

  req.apiKey = apiKeyData;

  next();
}