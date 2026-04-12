import { type TApiKey } from "@repo/db"

declare global {
  namespace Express {
    interface Request {
      apiKey: TApiKey
    }
  }
}