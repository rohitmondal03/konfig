import { compare, hash } from "bcrypt";
import { nanoid } from "nanoid";
import crypto from "crypto";
import {
  API_KEY_PREFIX,
  ENCRYPTION_ALGO,
  ENCRYPTION_SECRET,
  KEY_ID_LENGTH,
  KEY_SECRET_LENGTH
} from "./constants"
import "dotenv/config";


// Generate random api key object, stored in DB
export async function generateApiKey() {
  const keyId = nanoid(KEY_ID_LENGTH)
  const key = nanoid(KEY_SECRET_LENGTH);
  const keyHash = await hash(key, 10);

  return { keyId, keyHash, key };
}


// For showing users
export function formatApiKey(keyId: string, key: string) {
  return `${API_KEY_PREFIX}_${keyId}${key}`;
}


export async function compareKeyWithHash(data: string | Buffer<ArrayBufferLike>, encrypted: string) {
  return await compare(data, encrypted);
}


export function extractKeyIdFromApiKey(apiKey: string) {

  // konfig_sk_12345678asdffghjj.....
  return apiKey.slice(API_KEY_PREFIX.length + 1, API_KEY_PREFIX.length + 1 + KEY_ID_LENGTH);
}


export function extractKeyFromApiKey(apiKey: string) {
  return apiKey.slice(API_KEY_PREFIX.length + 1 + KEY_ID_LENGTH);
}


export function encryptText(text: string) {
  const ALGO = ENCRYPTION_ALGO as string;
  const SECRET = crypto.createHash("sha256").update(ENCRYPTION_SECRET as string).digest();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(ALGO, SECRET, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}


export function decryptText(encryptedText: string) {
  const ALGO = ENCRYPTION_ALGO as string;
  const SECRET = process.env.ENCRYPTION_SECRET as string;

  const [ivHex, encryptedHex] = encryptedText.split(":");

  const key = crypto.createHash("sha256").update(SECRET).digest();

  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(ALGO, key, iv);

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}