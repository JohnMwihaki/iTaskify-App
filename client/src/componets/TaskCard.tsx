import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box,
  Tooltip,
  Button,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import { formatDistanceToNow } from "date-fns";
import { type Task } from "../Types/Task.type";

type TaskCardProps = {
  task: Task;
  context: "active" | "completed" | "trash";
  onEdit?: () => void;
  onDelete?: () => void;
  onRestore?: () => void;
  onToggleComplete?: () => void;
};

const TaskCard = ({
  task,
  context,
  onEdit,
  onDelete,
  onRestore,
  onToggleComplete,
}: TaskCardProps) => {
  const { title, description, createdAt, dueDate, priority, updatedAt } = task;

  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        borderLeft: `6px solid ${
          priority === "high"
            ? "#d32f2f"
            : priority === "medium"
            ? "#ed6c02"
            : "#90a4ae"
        }`,
        backgroundColor: context === "completed" ? "#f9fcf9" : "#fff",
        borderRadius: 3,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        height: "100%",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, color: "#333", wordBreak: "break-word" }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5, lineHeight: 1.5 }}
        >
          {description}
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
          <Chip
            label={`Priority: ${priority}`}
            color={getPriorityColor()}
            size="small"
          />
          {dueDate && (
            <Chip
              label={`Due ${formatDistanceToNow(new Date(dueDate), {
                addSuffix: true,
              })}`}
              color="secondary"
              size="small"
            />
          )}
          <Chip
            label={`Created ${formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}`}
            variant="outlined"
            size="small"
          />
          {updatedAt && updatedAt !== createdAt && (
            <Chip
              label={`Updated ${formatDistanceToNow(new Date(updatedAt), {
                addSuffix: true,
              })}`}
              variant="outlined"
              size="small"
            />
          )}
        </Box>
      </CardContent>

      <Divider sx={{ my: 1 }} />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={1}
      >
        {context !== "trash" && (
          <Button
            variant="contained"
            color={context === "completed" ? "success" : "error"}
            size="small"
            onClick={onToggleComplete}
            disabled={!onToggleComplete}
            sx={{ textTransform: "capitalize", fontWeight: 600 }}
          >
            {context === "completed" ? "Completed" : "Mark Complete"}
          </Button>
        )}

        <Box display="flex" gap={1}>
          {context !== "trash" && (
            <Tooltip title="Edit task">
              <IconButton
                onClick={onEdit}
                disabled={!onEdit}
                sx={{
                  color: "var(--deep-green)",
                  bgcolor: "var(--smoke-white)",
                  "&:hover": {
                    bgcolor: "var(--red)",
                    color: "var(--soft-sand)",
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {context === "trash" ? (
            <Tooltip title="Restore task">
              <IconButton
                onClick={onRestore}
                disabled={!onRestore}
                sx={{
                  color: "var(--red)",
                  bgcolor: "var(--smoke-white)",
                  "&:hover": {
                    bgcolor: "var(--red)",
                    color: "var(--soft-sand)",
                  },
                }}
              >
                <RestoreIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Delete task">
              <IconButton
                onClick={onDelete}
                disabled={!onDelete}
                sx={{
                  color: "var(--red)",
                  bgcolor: "var(--smoke-white)",
                  "&:hover": {
                    bgcolor: "var(--red)",
                    color: "var(--soft-sand)",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default TaskCard;
