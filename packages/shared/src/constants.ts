export const ENV = process.env.NODE_ENV;

export const API_URL = "http://localhost:4000";
export const API_PREFIX = "/v1/public";
export const API_KEY_PREFIX = "konfig_sk"

export const KEY_ID_LENGTH = 8;
export const KEY_SECRET_LENGTH = 16;

export const AUTH_HEADER_PREFIX = "Bearer ";

export const URLS = {
  docs: process.env.NEXT_PUBLIC_DOCS_URL! || "http://localhost:3001",
  dashoard: "/dashboard",
  github: "https://github.com/rohitmondal03/konfig"
}