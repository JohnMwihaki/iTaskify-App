import { Button, TextField, MenuItem, Stack, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { type TaskInput } from "../Types/Task.type";

type TaskFormProps = {
  defaultValues: TaskInput;
  onSubmit: (data: TaskInput) => void;
};

export default function TaskForm({ defaultValues, onSubmit }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInput>({
    defaultValues: {
      ...defaultValues,
      priority: defaultValues.priority || "",
    },
  });

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 4,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        mb={3}
        textAlign="center"
        color="var(--dark)"
      >
        Task Details
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label="Title"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            {...register("description", { required: "Description is required" })}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            type="date"
            label="Due Date"
            {...register("dueDate", { required: "Due date is required" })}
            error={!!errors.dueDate}
            helperText={errors.dueDate?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            select
            label="Priority"
            defaultValue={defaultValues.priority || ""}
            {...register("priority", { required: "Priority is required" })}
            error={!!errors.priority}
            helperText={errors.priority?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          >
            <MenuItem value="">Select priority</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: "var(--amber)",
              color: "white",
              fontWeight: 600,
              py: 1.4,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": { bgcolor: "var(--golden-yellow)" },
            }}
          >
            Save Task
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
