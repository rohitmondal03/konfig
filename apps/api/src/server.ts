import express, { Request, Response } from "express"
import cors from "cors"
import { internalConfigsRoutes } from "./routes/internal/configs"
import { internalProjectsRoutes } from "./routes/internal/projects"
import { publicConfigsRoutes } from "./routes/public/configs"
import { API_PREFIX } from "@repo/shared"

const app = express()

app.use(cors());
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


app.listen(4000, () => {
  console.log("API running on port 4000");
})