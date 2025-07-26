import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export const client = new PrismaClient();

const JWT_TOKEN = process.env.JWT_TOKEN!;

export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_TOKEN, { expiresIn: "1d" });
}
