import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { useAuthStore } from "../stores/authStore";
import ProfileUpdateForm from "../forms/ProfileUpdateForm";
import PasswordUpdateForm from "../forms/PasswordUpdateForm";
import AvatarDisplayCard from "../componets/AvatarDisplayCard";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [activeSection, setActiveSection] = useState<"profile" | "password">(
    "profile"
  );
  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "row",
        borderRadius: 3,
        p: 3,
        gap: 1,
        width: "100%",
        minHeight: "500px",
      }}
    >
      <Box
        sx={{
          width: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AvatarDisplayCard/>
        

        <Typography mt={1} variant="h6" fontWeight={600}>
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email}
        </Typography>

        <Divider sx={{ my: 3, width: "100%" }} />

        <Stack spacing={2} width="100%">
          <Button
            variant={activeSection === "profile" ? "contained" : "outlined"}
            fullWidth
            onClick={() => setActiveSection("profile")}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Update Profile
          </Button>
          <Button
            variant={activeSection === "password" ? "contained" : "outlined"}
            fullWidth
            onClick={() => setActiveSection("password")}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Change Password
          </Button>
        </Stack>
      </Box>

      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
      >
        {activeSection === "profile" && <ProfileUpdateForm />}
        {activeSection === "password" && <PasswordUpdateForm />}
      </Box>
    </Paper>
  );
}
