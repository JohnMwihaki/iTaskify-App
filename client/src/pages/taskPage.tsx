import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  Button,
  Breadcrumbs,
  Link,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import TaskCard from "../componets/TaskCard";
import {
  getUserTasks,
  deleteTask,
  completeTask,
  markTaskIncomplete,
} from "../services/taskApi";
import { type Task } from "../Types/Task.type";

const TaskPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getUserTasks,
  });

  const handleSoftDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast.success("Task moved to trash");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["completedTasks"] });
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      if (task.isCompleted) {
        await markTaskIncomplete(task.id);
        toast.success("Task marked as incomplete");
      } else {
        await completeTask(task.id);
        toast.success("Task marked as complete");
      }

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["completedTasks"] });
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  const activeTasks =
    tasks?.filter((task: Task) => !task.isDeleted && !task.isCompleted) || [];

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 3, fontSize: "0.9rem", color: "text.secondary" }}
      >
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer", fontWeight: 500 }}
          onClick={() => navigate("/")}
        >
          Home
        </Link>
        <Typography color="text.primary" fontWeight={600}>
          Tasks
        </Typography>
      </Breadcrumbs>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold" color="var(--dark)">
          All Tasks
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "var(--amber)",
            px: 3,
            fontWeight: 600,
            "&:hover": { bgcolor: "var(--golden-yellow)" },
          }}
          onClick={() => navigate("/tasks/new")}
        >
          + New Task
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress color="primary" />
        </Box>
      ) : isError ? (
        <Typography color="error" mt={3} textAlign="center" fontWeight={500}>
          Failed to fetch tasks.
        </Typography>
      ) : activeTasks.length === 0 ? (
        <Box mt={6} textAlign="center">
          <Typography variant="body1" color="text.secondary" fontSize="1.1rem">
            No tasks available. Create your first task!
          </Typography>
        </Box>
      ) : (
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={3}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          {activeTasks.map((task: Task) => (
            <Paper
              key={task.id}
              elevation={3}
              sx={{
                flex: { xs: "100%", sm: "48%", md: "30%" },
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <TaskCard
                task={task}
                context="active"
                onEdit={() => navigate(`/edit/${task.id}`)}
                onDelete={() => handleSoftDelete(task.id)}
                onToggleComplete={() => handleToggleComplete(task)}
              />
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TaskPage;
