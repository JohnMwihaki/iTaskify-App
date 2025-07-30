import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  uploadAvatarToCloudinary,
  updateUserAvatar,
} from "../services/userApi";
import { useAuthStore } from "../stores/authStore";

export default function AvatarUploadForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { setUser } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Please select an image");

      const cloudinaryUrl = await uploadAvatarToCloudinary(file);
      const updatedUser = await updateUserAvatar(cloudinaryUrl);

      setUser(updatedUser);

      return updatedUser;
    },
    onSuccess: () => {
      toast.success("Avatar updated!");
      onClose();
    },
    onError: (err: any) =>
      toast.error(err?.message || "Avatar upload failed"),
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Avatar</DialogTitle>
      <DialogContent>
        <Stack spacing={2} alignItems="center" mt={1}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() => mutate()}
            disabled={isPending}
          >
            {isPending ? <CircularProgress size={20} /> : "Upload"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
