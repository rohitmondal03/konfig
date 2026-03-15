import { compare, hash } from "bcrypt";
import { nanoid } from "nanoid";
import { API_KEY_PREFIX, KEY_ID_LENGTH, KEY_SECRET_LENGTH } from "./constants"


// Generate random api key object, stored in DB
export async function generateApiKey() {
  const keyId = nanoid(KEY_ID_LENGTH)
  const key = nanoid(KEY_SECRET_LENGTH);
  const keyHash = await hash(key, 10);

  return { keyId, keyHash, key };
}


export async function compareKeyWithHash(data: string | Buffer<ArrayBufferLike>, encrypted: string) {
  return await compare(data, encrypted);
}


// For showing users
export function formatApiKey(keyId: string, key: string) {
  return `${API_KEY_PREFIX}_${keyId}${key}`;
}


export function extractKeyIdFromApiKey(apiKey: string) {

  // konfig_sk_12345678asdffghjj.....
  return apiKey.slice(API_KEY_PREFIX.length + 1, API_KEY_PREFIX.length + 1 + KEY_ID_LENGTH);
}


export function extractKeyFromApiKey(apiKey: string) {
  return apiKey.slice(API_KEY_PREFIX.length + 1 + KEY_ID_LENGTH);
}