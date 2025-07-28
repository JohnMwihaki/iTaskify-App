import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/tasks.route";
dotenv.config(
  
);
const tasky = express();
tasky.use(cors());
tasky.use(express.json());
tasky.post("/", (_req, res) => {
  res.send("<h1>Welcome To The TaskY manager app</h1>");
});

tasky.use("/api/auth", authRoutes);
tasky.use("/api/user", userRoutes);
tasky.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 5600;
tasky.listen(port, () => console.log(`Listening at port ${port} server`));
