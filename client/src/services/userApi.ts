import API from "../services/axios";
import { type ProfileUpdateValues } from "../Types/Task.type";

export async function getUserProfile() {
  const response = await API.get("/users/me");
  return response.data;
}

export async function updateUserAvatar(avatarUrl: string) {
  const response = await API.patch("/users/avatar", { avatar: avatarUrl });
  return response.data;
}

export async function updateUserProfile(data: ProfileUpdateValues) {
  const response = await API.patch("/user/profile", data);
  return response.data;
}
