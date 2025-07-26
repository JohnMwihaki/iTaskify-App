import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import BreadcrumbsNav from "../componets/BreadCrumbNav";
import TaskCard from "../componets/TaskCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  getCompletedTasks,
  markTaskIncomplete,
  deleteTask,
} from "../services/taskApi";
import { type Task } from "../Types/Task.type";

export default function CompletedTasksPage() {
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<Task[]>({
    queryKey: ["completedTasks"],
    queryFn: getCompletedTasks,
  });

  const handleMarkIncomplete = async (taskId: string) => {
    try {
      await markTaskIncomplete(taskId);
      toast.success("Task marked as incomplete");
      queryClient.invalidateQueries({ queryKey: ["completedTasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    } catch {
      toast.error("Failed to update task status");
    }
  };

  const handleSoftDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast.success("Task moved to trash");
      queryClient.invalidateQueries({ queryKey: ["completedTasks"] });
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }}>
      <BreadcrumbsNav items={[{ label: "Completed Tasks" }]} />

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        color="var(--dark)"
        textAlign="center"
        mb={4}
      >
        Completed Tasks
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress color="primary" />
        </Box>
      ) : isError ? (
        <Typography color="error" mt={2} textAlign="center" fontWeight={500}>
          Failed to load completed tasks. Please try again later.
        </Typography>
      ) : tasks && tasks.length > 0 ? (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          {tasks.map((task) => (
            <Paper
              key={task.id}
              elevation={3}
              sx={{
                width: { xs: "100%", sm: "48%", md: "30%" },
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <TaskCard
                task={task}
                context="completed"
                onDelete={() => handleSoftDelete(task.id)}
                onToggleComplete={() => handleMarkIncomplete(task.id)}
              />
            </Paper>
          ))}
        </Box>
      ) : (
        <Box mt={6} textAlign="center">
          <Typography color="text.secondary" fontSize="1.1rem">
            No completed tasks found.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
