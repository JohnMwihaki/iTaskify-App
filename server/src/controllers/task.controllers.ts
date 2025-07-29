import { Request, Response } from "express";
import { client } from "../config/prisma";


const includeUser = {
  users: {
    select: {
      firstName: true,
      lastName: true,
    },
  },
};

// Create a new task
export async function createTask(req: Request, res: Response) {
  const { title, description, priority, dueDate } = req.body;
  const userId = res.locals.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: No user ID found" });
  }

  if (!title || !priority || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newTask = await client.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: new Date(dueDate),
        userId,
        isDeleted: false,
        isComplete: false,
      },
      include: includeUser,
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error("Failed to create task:", err);
    res.status(500).json({ error: "Something went wrong creating the task" });
  }
}

// Get all tasks belonging to the logged-in user
export async function getAllTasks(req:Request, res: Response) {
  const userId = res.locals.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const tasks = await client.task.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      include: includeUser,
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to get tasks" });
  }
}

// Get all Trash tasks belonging to the logged-in user
export async function getTrashTasks(req:Request, res: Response) {
  const userId = res.locals.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const tasks = await client.task.findMany({
      where: {
        userId,
        isDeleted: true,
      },
      include: includeUser,
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to get tasks" });
  }
}

// Get a specific task by task ID
export async function getSpecificTask(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const task = await client.task.findUnique({
      where: { id },
      include: includeUser,
    });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ error: "Failed to fetch task" });
  }
}

// Update a task's details
export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, priority, dueDate } = req.body;
  const userId = res.locals.userId;

  try {
    const existingTask = await client.task.findUnique({ where: { id } });

    if (!existingTask || existingTask.userId !== userId) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    const updatedTask = await client.task.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        ...(dueDate && { dueDate: new Date(dueDate) }),
      },
    });

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
}

// Mark task as deleted
export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const task = await client.task.findUnique({ where: { id } });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    const deletedTask = await client.task.update({
      where: { id },
      data: { isDeleted: true },
    });

    res.status(200).json(deletedTask);
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
}
// Restore a deleted task
export async function restoreTask(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const task = await client.task.findUnique({ where: { id } });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    const restoredTask = await client.task.update({
      where: { id },
      data: { isDeleted: false },
    });

    res.status(200).json(restoredTask);
  } catch (err) {
    console.error("Error restoring task:", err);
    res.status(500).json({ error: "Failed to restore task" });
  }
}

// Controller to get all completed tasks
export async function getCompletedTasks(
  req: Request,
  res: Response
) {
  const userId = res.locals.userId;

  try {
    const tasks = await client.task.findMany({
      where: {
        userId,
        isDeleted: false,
        isComplete: true,
      },
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching completed tasks:", err);
    res.status(500).json({ error: "Failed to fetch completed tasks" });
  }
}

// Mark a task as completed
export async function completeTask(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const task = await client.task.findUnique({ where: { id } });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    const completedTask = await client.task.update({
      where: { id },
      data: { isComplete: true },
    });

    res.status(200).json(completedTask);
  } catch (err) {
    console.error("Error completing task:", err);
    res.status(500).json({ error: "Failed to mark task as completed" });
  }
}

// Mark a task as incomplete
export async function incompleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const task = await client.task.findUnique({ where: { id } });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    const updatedTask = await client.task.update({
      where: { id },
      data: { isComplete: false },
    });

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error marking task as incomplete:", err);
    res.status(500).json({ error: "Failed to mark task as incomplete" });
  }
}
