import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuthStore } from "../stores/authStore";
import AvatarUploadForm from "../forms/AvatarUploadForm";
import { useState } from "react";

export default function AvatarDisplayCard() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <>
      <Box position="relative" display="inline-block">
        <Avatar
          key={user?.avatarUrl}
          src={user?.avatarUrl}
          alt={user?.firstName}
          sx={{
            width: 110,
            height: 110,
            border: "3px solid var(--amber)",
            bgcolor: "grey.300",
          }}
        />
        <Tooltip title="Upload new avatar">
          <IconButton
            onClick={() => setUploadOpen(true)}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "var(--amber)",
              color: "white",
              "&:hover": { bgcolor: "var(--golden-yellow)" },
            }}
          >
            <CloudUploadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <AvatarUploadForm
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />
    </>
  );
}
