import "dotenv/config";


export const APP_NAME = "Konfig";

export const ENV = process.env.NODE_ENV;

export const WEB_SITE_URL = "http://localhost:3000";

export const DOCS_SITE_URL = "http://localhost:3001";

export const GITHUB_URL = "https://github.com/rohitmondal03/konfig";

export const WEB_APP_PATH = {
  home: "/",
  dashboard: "/dashboard",
  login: "/login",
}

export const API_URL = "http://localhost:4000";
export const API_PREFIX = "/v1/public";
export const API_KEY_PREFIX = "konfig_sk"

export const KEY_ID_LENGTH = 8;
export const KEY_SECRET_LENGTH = 16;

export const AUTH_HEADER_PREFIX = "Bearer ";
export const AUTH_COOKIE_TOKEN = "konfig_auth_token";

export const ENCRYPTION_ALGO = "aes-256-cbc";
export const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;

export const LOGIN_MIN_PASSWORD_LENGTH = 8;
export const LOGIN_MAX_PASSWORD_LENGTH = 16;

export const DEFAULT_ERROR_MESSAGE = "Something went wrong";