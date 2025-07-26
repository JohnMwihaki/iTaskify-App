import { Box } from "@mui/material";
import LoginForm from "../forms/LoginForm";

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--smoke-white)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "xl",
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
