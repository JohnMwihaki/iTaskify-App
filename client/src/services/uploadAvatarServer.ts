import API from "./axios"

export async function uploadAvatarToBackend(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await API.post("/user/upload/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
