import { Button, TextField, Typography, Paper, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updatePassword } from "../services/authApi";

type PasswordUpdateValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function PasswordUpdateForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PasswordUpdateValues>();

  const { mutate, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password updated successfully!");
      reset();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update password"
      );
    },
  });

  const onSubmit = (data: PasswordUpdateValues) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <Paper
      sx={{
        p: 5,
        maxWidth: 500,
        mx: "auto",
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "white",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        mb={3}
        textAlign="center"
        color="var(--dark)"
      >
        Update Your Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ width: 350 }}>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "New password must be at least 6 characters",
              },
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
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
            {isPending ? "Updating..." : "Update Password"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
