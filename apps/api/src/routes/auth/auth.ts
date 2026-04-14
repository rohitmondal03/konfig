import { Router } from "express";
import { auth } from "../../auth/auth.config";
import { AUTH_COOKIE_TOKEN } from "@repo/shared";


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

    res.cookie(AUTH_COOKIE_TOKEN, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })

    console.log(user, token);
    res.status(200).json({ user, token });
  }
  catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.body.message });
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

    res.cookie(AUTH_COOKIE_TOKEN, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
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
  let headers = req.headers as any;
  if (req.headers.authorization?.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1];
    headers = new Headers(req.headers as any);
    headers.set("cookie", `better-auth.session_token=${token}`);
  }

  const session = await auth.api.getSession({
    headers: headers,
  })

  if (!session) {
    return res.status(401).json({ message: "Session not present" })
  }

  return res.status(200).json(session);
})


export const authConfigsRoutes = router;