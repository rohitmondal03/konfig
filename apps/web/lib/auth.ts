import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { lastLoginMethod, haveIBeenPwned } from "better-auth/plugins"
import { db } from "@repo/db"
import { APP_NAME, LOGIN_MIN_PASSWORD_LENGTH } from "@repo/shared";

export const auth = betterAuth({
  appName: APP_NAME,
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: LOGIN_MIN_PASSWORD_LENGTH,
  },
  plugins: [
    lastLoginMethod(),
    haveIBeenPwned(),
  ],
  socialProviders: {
    github: {
      enabled: true,
      clientId: "",
      clientSecret: "",
    }
  }
});