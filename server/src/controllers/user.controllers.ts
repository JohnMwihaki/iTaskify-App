import { Request, Response } from "express";
import { client } from "../config/prisma";


// Get logged in user's details
export async function getUserProfile(req: Request, res: Response) {
  const userId = res.locals.userId;

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
  req: Request,
  res: Response
) {
  const userId = res.locals.userId;
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
      omit:{password: true}
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user profile", err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
}

export async function updateUserAvatar(req: Request, res: Response) {
  try {
    const userId = res.locals.userId; 
    const { avatar } = req.body; 

    if (!avatar) {
      return res.status(400).json({ message: "No avatar URL provided" });
    }

    const updatedUser = await client.user.update({
      where: { id: userId },
      data: { avatarUrl: avatar },
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

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}