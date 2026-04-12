export interface KonfigOptions {
  apiKey: string
  baseUrl?: string
}

export type CONFIG_ENVIRONMENT = "production" | "development";

export interface ConfigResponse {
  key: string
  value: string
  environment: CONFIG_ENVIRONMENT
}