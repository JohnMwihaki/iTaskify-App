import { Button, TextField, Typography, Paper, Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUserProfile } from "../services/userApi";
import { useAuthStore } from "../stores/authStore";

type ProfileUpdateValues = {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
};

export default function ProfileUpdateForm() {
  const { user, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileUpdateValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      emailAddress: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userName: user.userName || "",
        emailAddress: user.email || "",
      });
    }
  }, [user, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedUser) => {
      toast.success("Profile updated successfully!");
      setUser(updatedUser);
      reset({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        userName: updatedUser.userName,
        emailAddress: updatedUser.email,
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  const onSubmit = (data: ProfileUpdateValues) => {
    if (!user) return;
    const unchanged =
      data.firstName === user.firstName &&
      data.lastName === user.lastName &&
      data.userName === user.userName &&
      data.emailAddress === user.email;

    if (unchanged) {
      toast("Your profile is already up to date.");
      return;
    }
    mutate(data);
  };

  return (
    <Paper
      sx={{
        p: 5,
        maxWidth: 600,
        mx: "auto",
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
        Update Profile
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ minheight: "auto", width: 350 }}>
          <TextField
            label="First Name"
            fullWidth
            {...register("firstName", { required: "First name is required" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            label="Last Name"
            fullWidth
            {...register("lastName", { required: "Last name is required" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            label="Username"
            fullWidth
            {...register("userName", { required: "Username is required" })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />

          <TextField
            label="Email Address"
            fullWidth
            type="email"
            {...register("emailAddress", {
              required: "Email address is required",
            })}
            error={!!errors.emailAddress}
            helperText={errors.emailAddress?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isPending}
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
            {isPending ? "Updating..." : "Update Profile"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
