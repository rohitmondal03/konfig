import type { TApiKey } from "./db/types"

declare global {
  namespace Express {
    interface Request {
      apiKey: TApiKey
    }
  }
}