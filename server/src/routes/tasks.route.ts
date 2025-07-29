import express from "express";
import {
  createTask,
  getAllTasks,
  getSpecificTask,
  updateTask,
  deleteTask,
  restoreTask,
  getCompletedTasks,
  getTrashTasks,
  completeTask,
  incompleteTask,
} from "../controllers/task.controllers";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authenticate);

router.get("/completed", getCompletedTasks);
router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/trash", getTrashTasks);
router.get("/:id", getSpecificTask);
router.patch("/:id", updateTask);
router.patch("/:id/delete", deleteTask);
router.patch("/:id/restore", restoreTask);
router.patch("/complete/:id", completeTask);
router.patch("/:id/incomplete", incompleteTask);

export default router;
