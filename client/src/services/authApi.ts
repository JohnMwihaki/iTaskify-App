import API from "../services/axios";
import {
  type LoginInput,
  type RegisterInput,
  type PasswordUpdateData,
} from "../Types/Task.type";

export async function loginUser(data: LoginInput) {
  const response = await API.post("/auth/login", data);
  return response.data;
}

export async function registerUser(data: RegisterInput) {
  const response = await API.post("/auth/register", data);
  return response.data;
}

export async function updatePassword(data: PasswordUpdateData) {
  const response = await API.patch("/auth/updatePassword", data);
  return response.data;
}

export async function logoutUser() {
  const response = await API.post("/logout");
  return response.data;
}
