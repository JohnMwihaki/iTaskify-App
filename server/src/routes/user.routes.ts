import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controllers";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authenticate, getUserProfile);
router.patch("/", authenticate, updateUserProfile);

export default router;
