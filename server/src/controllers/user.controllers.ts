import { Response } from "express";
import { client } from "../config/prisma";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

// Get logged in user's details
export async function getUserProfile(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: No user ID found" });
  }

  try {
    const user = await client.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        createdAt: true,
        LastUpDatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user profile", err);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
}

// Update logged in user info
export async function updateUserProfile(
  req: AuthenticatedRequest,
  res: Response
) {
  const userId = req.userId;
  const { firstName, lastName, email } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: No user ID found" });
  }

  try {
    const updatedUser = await client.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        LastUpDatedAt: true,
      },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user profile", err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
}

// Upload avatar
export async function uploadAvatar(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const avatarUrl = `/uploads/${req.file.filename}`;

    const updatedUser = await client.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });

    res.status(200).json({
      message: "Avatar uploaded successfully",
      avatarUrl: updatedUser.avatarUrl,
    });
  } catch (err) {
    console.error("Avatar upload failed:", err);
    res.status(500).json({ error: "Failed to upload avatar" });
  }
}
