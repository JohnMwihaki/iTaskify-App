import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

type AvatarDisplayProps = {
  avatarUrl?: string;
  fullName?: string;
  size?: number;
};

const AvatarDisplay = ({
  avatarUrl,
  fullName = "User",
  size = 40,
}: AvatarDisplayProps) => {
  const getInitials = () => {
    const names = fullName.trim().split(" ");
    if (names.length === 0) return "U";
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  };

  return (
    <Avatar
      src={avatarUrl}
      sx={{
        width: size,
        height: size,
        bgcolor: avatarUrl ? "transparent" : "primary.main",
        fontSize: size / 2.5,
      }}
    >
      {avatarUrl ? null : getInitials() || <PersonIcon />}
    </Avatar>
  );
};

export default AvatarDisplay;
