export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  isDeleted: boolean;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskInput {
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  isDeleted?: boolean;
}

export type LoginInput = {
  identifier: string;
  password: string;
};
export type RegisterInput = {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type PasswordUpdateData = {
  currentPassword: string;
  newPassword: string;
};

export type ProfileUpdateValues = {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
};
