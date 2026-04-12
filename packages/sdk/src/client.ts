import { API_PREFIX, API_URL } from "@repo/shared"
import type { CONFIG_ENVIRONMENT, ConfigResponse } from "./types";

export class Konfig {
  private apiKey: string
  private baseUrl: string

  // for caching the keys
  // Structure - key: {value: "Xxxx", environment: "dev"}
  private cache = new Map<string, {
    value: string,
    environment: CONFIG_ENVIRONMENT
  }>()

  constructor(options: { apiKey: string }) {
    this.apiKey = options.apiKey;
    this.baseUrl = API_URL;
  }

  async get(key: string) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const response = await fetch(`${this.baseUrl}/${API_PREFIX}/configs?key=${key}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch config for key: ${key}`);
    }

    const data = await response.json() as ConfigResponse;

    this.cache.set(key, { value: data.value, environment: data.environment });

    return data.value;
  }

  async preload() {
    const response = await fetch(`${this.baseUrl}/${API_PREFIX}/configs`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    const data = await response.json() as ConfigResponse[];

    data.forEach(con => this.cache.set(con.key, { value: con.value, environment: con.environment }))
  }
}