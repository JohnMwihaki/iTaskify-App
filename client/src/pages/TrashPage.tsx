import { useQuery } from "@tanstack/react-query";
import { getTrashTasks, restoreTask } from "../services/taskApi";
import TaskCard from "../componets/TaskCard";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Stack,
  CircularProgress,
} from "@mui/material";
import { type Task } from "../Types/Task.type";
import { useNavigate } from "react-router-dom";
import queryClient from "../main";

const TrashPage = () => {
  const navigate = useNavigate();

  const {
    data: trashedTasks,
    isLoading,
    isError,
  } = useQuery<Task[]>({
    queryKey: ["Trash"],
    queryFn: getTrashTasks,
  });

  // const trashedTasks = tasks?.filter((task) => task.isDeleted) || [];

  const handleRestore = async (taskId: string) => {
    try {
      await restoreTask(taskId);
      await queryClient.invalidateQueries({ queryKey: ['Trash'] });
    } catch (err) {
      console.error("Failed to restore task:", err);
    }
  };

  return (
    <Box p={4}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
          Home
        </Link>
        <Typography color="text.primary">Trash</Typography>
      </Breadcrumbs>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Trash
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Typography color="error">Failed to load tasks.</Typography>
      ) : trashedTasks?.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Trash is empty.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {trashedTasks?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              context="trash"
              onRestore={() => handleRestore(task.id)}
              onDelete={() => {}}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TrashPage;
