import { Router } from "express";
import { eq } from "drizzle-orm";
import { fromNodeHeaders } from "better-auth/node";
import { db } from "@repo/db";
import { userTable } from "@repo/db/src/db/schema";
import { auth } from "../../auth/auth.config";


const router = Router();


// To login a user
// API - "/auth/login-user"
router.post("/login-user", async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;

  try {
    const { user, token } = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: true,
      }
    })

    return res.status(200).json({ user, token });
  }
  catch (error: any) {
    console.log("ERROR", error);
    return res.status(500).json({ error: error.body.message });
  }
})


// To singup a new user
// API - "/auth/create-user"
router.post("/create-user", async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  const username = body.username;
  const name = body.name;

  try {
    const { user, token } = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        username,
        rememberMe: true,
      },
    })

    return res.status(200).json({ user, token });
  }
  catch (error: any) {
    return res.status(500).json({ error: error.body.message });
  }
})


// To check if session is present
// API - "/auth/check-session"
router.get("/check-session", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: "Session not present" });
    }

    return res.status(200).json(session);
  } catch (error) {
    return res.status(500).json({ error: "Failed to read session" });
  }
});


// To get current user
// API - "/auth/get-user"
router.get("/get-user", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "Session not available" });
    }

    const [{ username }] = await db
      .select({ username: userTable.displayUsername })
      .from(userTable)
      .where(eq(userTable.id, session.user.id))
      .limit(1);

    return res.status(200).json({ ...session.user, username });
  }
  catch (error) {
    return res.status(500).json({ error: "Failed to read session" });
  }
});


// To logout current user
// API - "/auth/logout"
router.post("/logout", async (req, res) => {
  try {
    await auth.api.signOut({
      headers: fromNodeHeaders(req.headers),
    });

    return res.status(200).json({ message: "Signed out successfully" });
  }
  catch (error) {
    return res.status(500).json({ error: "Failed to sign out" });
  }
});


export const authConfigsRoutes = router;