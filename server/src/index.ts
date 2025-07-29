import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/tasks.route";
dotenv.config();

const tasky = express();

tasky.use(express.json());

tasky.get("/", (_req: Request, res: Response) =>
  res.status(200).json({ messege: "Thank you .I got the test" })
);
tasky.use(
  cors({
    origin: ["https://i-taskify-app.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
tasky.post("/", (_req, res) => {
  res.send("<h1>Welcome To The iTaskify manager app</h1>");
});

tasky.use("/api/auth", authRoutes);
tasky.use("/api/user", userRoutes);
tasky.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 5600;
tasky.listen(port, () => console.log(`Listening at port ${port} server`));
