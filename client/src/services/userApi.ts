import API from "../services/axios";
import { type ProfileUpdateValues } from "../Types/Task.type";
import { useAuthStore } from "../stores/authStore";

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

export async function uploadAvatarToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await API.post("/user/upload/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.avatarUrl;
}
