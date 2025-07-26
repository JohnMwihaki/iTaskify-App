import { Container, Paper } from "@mui/material";
import { toast } from "react-hot-toast";
import BreadcrumbNav from "../componets/BreadCrumbNav";
import { useNavigate } from "react-router-dom";
import TaskForm from "../forms/TaskForm";
import { createTask } from "../services/taskApi";
import { type TaskInput } from "../Types/Task.type";

export default function NewTaskPage() {
  const Navigate = useNavigate();
  const handleCreateTask = async (data: TaskInput) => {
    try {
      await createTask(data);
      toast.success("Task created successfully");
      Navigate("/tasks");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create task");
    }
  };

  return (
    <Container maxWidth="md">
      <BreadcrumbNav
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tasks", href: "/tasks/new" },
          { label: "New Task" },
        ]}
      />
      <Paper sx={{ p: 4, mt: 4 }}>
        <TaskForm
          defaultValues={{
            title: "",
            description: "",
            dueDate: "",
            priority: "medium",
          }}
          onSubmit={handleCreateTask}
        />
      </Paper>
    </Container>
  );
}
