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

  
  const token = useAuthStore.getState().token;
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch("http://localhost:5600/api/user/upload/avatar", {
    method: "POST",
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const data = await response.json();
  return data.avatarUrl; 
}


