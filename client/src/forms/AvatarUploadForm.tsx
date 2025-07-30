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
import { uploadAvatarToCloudinary, updateUserAvatar } from "../services/userApi";
import { useAuthStore } from "../stores/authStore";

export default function AvatarUpload({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user, setUser } = useAuthStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (!selectedFile) throw new Error("No file selected");

      const cloudinaryUrl = await uploadAvatarToCloudinary(selectedFile);
      await updateUserAvatar(cloudinaryUrl); 

      if (!user) throw new Error("User not found in store");

      
      setUser({ ...user, avatarUrl: cloudinaryUrl });

      toast.success("Avatar uploaded successfully!");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Upload failed");
    },
  });

  const handleUpload = () => {
    mutation.mutate();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Avatar</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile || mutation.isPending}
          >
            {mutation.isPending ? <CircularProgress size={24} /> : "Upload"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
