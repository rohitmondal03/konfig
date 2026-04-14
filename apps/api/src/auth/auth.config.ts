import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { lastLoginMethod, haveIBeenPwned, username, customSession } from "better-auth/plugins"
import { schema, db } from "@repo/db"
import { APP_NAME, LOGIN_MAX_PASSWORD_LENGTH, LOGIN_MIN_PASSWORD_LENGTH } from "@repo/shared";

export const auth = betterAuth({
  appName: APP_NAME,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: LOGIN_MIN_PASSWORD_LENGTH,
    maxPasswordLength: LOGIN_MAX_PASSWORD_LENGTH,
  },
  socialProviders: {
    github: {
      enabled: true,
      clientId: "",
      clientSecret: "",
    }
  },
  plugins: [
    lastLoginMethod(),
    haveIBeenPwned(),
    username(),
    customSession(async ({ session }) => {
      return { session }
    }),
  ],
});