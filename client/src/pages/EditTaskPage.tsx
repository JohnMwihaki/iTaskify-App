import { Container, Typography, Paper, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import BreadcrumbNav from "../componets/BreadCrumbNav";
import TaskForm from "../forms/TaskForm";
import { getTaskById, updateTask } from "../services/taskApi";
import { type Task, type TaskInput } from "../Types/Task.type";

const EditTaskPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const {
    data: task,
    isLoading,
    isError,
  } = useQuery<Task>({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId!),
    enabled: !!taskId,
  });

  const mutation = useMutation({
    mutationFn: (updatedData: TaskInput) => updateTask(taskId!, updatedData),
    onSuccess: () => {
      toast.success(" Task updated successfully!");
      navigate("/tasks");
    },
    onError: () => {
      toast.error("Failed to update task.");
    },
  });

  const handleUpdateTask = (updatedData: TaskInput) => {
    mutation.mutate(updatedData);
  };

  return (
    <Container maxWidth="md">
      <BreadcrumbNav
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tasks", href: "/tasks" },
          { label: "Edit Task" },
        ]}
      />

      <Paper sx={{ p: 4, mt: 4 }}>
        {isLoading ? (
          <CircularProgress />
        ) : isError || !task ? (
          <Typography color="error">Task not found.</Typography>
        ) : (
          <TaskForm
            defaultValues={{
              title: task.title,
              description: task.description,
              dueDate: task.dueDate,
              priority: task.priority,
            }}
            onSubmit={handleUpdateTask}
          />
        )}
      </Paper>
    </Container>
  );
};

export default EditTaskPage;
