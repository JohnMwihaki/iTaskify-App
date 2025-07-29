import { useAuthStore } from "../stores/authStore";

export async function uploadAvatarToBackend(file: File) {
  const formData = new FormData();
  formData.append("avatar", file); 

  const response = await fetch("http://localhost:5600/api/user/upload/avatar", {
    method: "POST",
    body: formData,
    credentials: "include", 
    headers: {
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const user = await response.json();
  return user;
}
