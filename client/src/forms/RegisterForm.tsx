import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "../services/authApi";
import { Link, useNavigate } from "react-router-dom";
import { GitHub, Google, Twitter } from "@mui/icons-material";

export type RegisterInput = {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        userName: form.userName,
        email: form.email,
        password: form.password,
      }),
    onSuccess: () => {
      toast.success(" Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    },
    onError: (error: any) => {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else if (error.response?.data?.includes("already exist")) {
        toast.error("Username or Email already exists");
      } else {
        toast.error("Registration failed. Please try again!");
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error(" Passwords do not match");
      return;
    }

    mutate();
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", borderRadius: 3, overflow: "hidden" }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(255, 255, 255, 0.75)",
          boxShadow: 4,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={1}
            textAlign="center"
            color="var(--dark)"
          >
            Create Your Account
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={2}
            textAlign="center"
          >
            Manage tasks with ease and style.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2} mt={2}>
              <TextField
                label="First Name"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
              />
              <TextField
                label="Username"
                name="userName"
                required
                value={form.userName}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                required
                inputProps={{ minLength: 8 }}
                value={form.password}
                onChange={handleChange}
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                sx={{
                  bgcolor: "var(--amber)",
                  color: "white",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "var(--golden-yellow)",
                  },
                }}
              >
                {isPending ? "Creating..." : "Create Tasky Account"}
              </Button>

              <Typography variant="body2" textAlign="center">
                Already a member? <Link to="/login">Log in</Link>
              </Typography>
            </Stack>
          </form>
        </Container>
      </Box>

      <Box
        sx={{
          flex: 1,
          backgroundImage:
            "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('./tasky.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          px: 6,
          textAlign: "center",
          position: "relative",
        }}
      >
        <Box mb={6}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
          >
            Welcome to Tasky
          </Typography>
          <Typography
            sx={{ opacity: 0.95, maxWidth: "500px", mx: "auto" }}
          >
            Stay organized. Stay focused. Achieve more. Tasky is your personal
            task manager that keeps you on track.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ position: "absolute", bottom: 30 }}
        >
          <IconButton
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              color: "white",
              "&:hover": { bgcolor: "var(--golden-yellow)" },
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              color: "white",
              "&:hover": { bgcolor: "var(--amber)" },
            }}
          >
            <Google />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              color: "white",
              "&:hover": { bgcolor: "var(--orange)" },
            }}
          >
            <GitHub />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default RegisterForm;
