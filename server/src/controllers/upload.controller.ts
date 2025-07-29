import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import { client } from '../config/prisma';

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'taskify/avatars',
      transformation: [{ width: 300, height: 300, crop: 'thumb', gravity: 'face' }],
    });

    const userId = res.locals.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const user = await client.user.update({
      where: { id: userId },
      data: { avatarUrl: result.secure_url },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        LastUpDatedAt: true,
      }
    });

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Upload failed" });
  }
};
