import { API_URL } from "@repo/shared"
import { ConfigResponse } from "./types";

export class Konfig {
  private apiKey: string
  private baseUrl: string
  private cache = new Map<string, string>()  // for caching the keys

  constructor(options: { apiKey: string }) {
    this.apiKey = options.apiKey;
    this.baseUrl = API_URL;
  }

  async get(key: string) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const response = await fetch(`${this.baseUrl}/v1/config?key=${key}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch config for key: ${key}`);
    }

    const data = await response.json() as ConfigResponse;

    this.cache.set(key, data.value);

    return data.value;
  }
}