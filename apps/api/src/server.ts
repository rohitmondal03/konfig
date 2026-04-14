import express, { Request, Response } from "express"
import cors from "cors"
import { API_PREFIX, WEB_SITE_URL } from "@repo/shared"
import { authConfigsRoutes } from "./routes/auth/auth"
import { internalConfigsRoutes } from "./routes/internal/configs"
import { internalProjectsRoutes } from "./routes/internal/projects"
import { publicConfigsRoutes } from "./routes/public/configs"

const app = express()

app.use(cors({
  origin: WEB_SITE_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_: Request, res: Response) => {
  res.send("Konfig API running")
})

// Internal routes
app.use("/configs", internalConfigsRoutes);
app.use("/projects", internalProjectsRoutes);

// Public routes
app.use(`${API_PREFIX}`, publicConfigsRoutes)

// Auth routes
app.use("/auth", authConfigsRoutes)

app.listen(4000, () => {
  console.log("API running on port 4000");
})