import express, { Express, Request, Response } from "express";
import { client, generateToken } from "../config/prisma";
import {AuthenticatedRequest} from '../middleware/auth.middleware'
import bcrypt from "bcrypt";

export async function Register(req: Request, res: Response) {
  const { firstName, lastName, userName, email, password } = req.body;

  try {
    const userExist = await client.user.findFirst({
      where: {
        OR: [{ userName }, { email }],
      },
    });

    if (userExist) {
      return res
        .status(404)
        .json({
          Error: `The user already exist.Try another username or email`,
        });
    }

    const HashPassword = await bcrypt.hash(password, 10);

    const user = await client.user.create({
      data: {
        firstName,
        lastName,
        userName,
        email,
        password: HashPassword,
      },
    });

    const token = generateToken(user.id);

    res
      .status(201)
      .json({ success: "Successfully created a user", user, token });
  } catch (err) {
    console.error("Error creating user", err);
    res.status(500).json("Error creating user.Check what wrong");
  }
}

export async function Login(req: Request, res: Response) {
  const { identifier, password } = req.body;

  try {
    const user = await client.user.findFirst({
      where: {
        OR: [{ userName: identifier }, { email: identifier }],
      },
    });

    if (!user) {
      return res.status(500).json("User don't exist");
    }

    const passCompare = await bcrypt.compare(password, user.password);

    if (!passCompare) {
      return res.status(500).json("You entered the wrong password.Try again");
    }

    const token = generateToken(user.id);

    res.status(200).json({ user, token });
  } catch (err) {
    console.error("Failed to logIn", err);
    res.status(500).json("failed to login.Something went wrong");
  }
}

// Update Password
export async function UpdatePassword(req: AuthenticatedRequest, res: Response) {
  const { currentPassword, newPassword } = req.body;
  const userId = res.locals.userId;

  try {
    const user = await client.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const matchPassword = await bcrypt.compare(currentPassword, user.password);
    if (!matchPassword) {
      return res.status(403).json({ error: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await client.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password", err);
    res.status(500).json({ error: "Failed to update password" });
  }
}


// Logout

export async function Logout(_req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
}
