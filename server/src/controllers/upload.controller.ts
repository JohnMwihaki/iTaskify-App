import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { client } from "../config/prisma";
export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "taskify/avatars",
            transformation: [
              { width: 300, height: 300, crop: "thumb", gravity: "face" },
            ],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        
        stream.end(req.file!.buffer);
      });
    };

    const result: any = await streamUpload();

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
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ message: "Upload failed" });
  }
};
