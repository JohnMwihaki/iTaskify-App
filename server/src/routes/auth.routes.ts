import express from "express";
import {
  Register,
  Login,
  Logout,
  UpdatePassword,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.patch("/updatePassword",authenticate, UpdatePassword);

export default router;
