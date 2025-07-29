import API from "./axios";
import { type TaskInput } from "../Types/Task.type";

// Get all tasks for the logged-in user
export async function getUserTasks() {
  const response = await API.get("/tasks");
  return response.data;
}
export async function getTrashTasks() {
  const response = await API.get("/tasks/trash");
  return response.data;
}

// Get a specific task by ID
export async function getTaskById(taskId: string) {
  const response = await API.get(`/tasks/${taskId}`);
  return response.data;
}

// Create a new task
export async function createTask(data: TaskInput) {
  const response = await API.post("/tasks", data);
  return response.data;
}

// Update a task
export async function updateTask(taskId: string, data: TaskInput) {
  const response = await API.patch(`/tasks/${taskId}`, data);
  return response.data;
}

// Mark a task as deleted
export async function deleteTask(taskId: string) {
  const response = await API.patch(`/tasks/${taskId}/delete`);
  return response.data;
}

// Restore a deleted task
export async function restoreTask(taskId: string) {
  const response = await API.patch(`/tasks/${taskId}/restore`);
  return response.data;
}
// Get completed tasks only
export async function getCompletedTasks() {
  const response = await API.get("/tasks/completed");
  return response.data;
}

// Mark task as completed
export async function completeTask(taskId: string) {
  const response = await API.patch(`/tasks/complete/${taskId}`);
  return response.data;
}

// Mark task as incomplete
export async function markTaskIncomplete(taskId: string) {
  const response = await API.patch(`/tasks/incomplete/${taskId}`);
  return response.data;
}
