import express from "express";
import {
  getUserProfile,
  updateUserAvatar,
  updateUserProfile,
} from "../controllers/user.controllers";
import { upload } from '../middleware/multer.middleware';
import { uploadAvatar } from '../controllers/upload.controller';

import { authenticate, } from "../middleware/auth.middleware";

const router = express.Router();
router.use(authenticate)

router.post('/upload/avatar',  upload.single('avatar'), uploadAvatar);
router.patch("/avatar", updateUserAvatar);
router.get("/",  getUserProfile);
router.patch("/",  updateUserProfile);

export default router;
