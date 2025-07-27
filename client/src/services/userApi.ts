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
  const response = await API.patch("/user", data);
  return response.data;
}

export async function uploadAvatarToCloudinary(file: File): Promise<string> {
  const data = new FormData();
  data.append("file", file);
  data.append("", "");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dmb3xmb8z/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();
  return result.secure_url;
}

