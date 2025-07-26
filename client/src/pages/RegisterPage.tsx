import { Box } from "@mui/material";
import RegisterForm from "../forms/RegisterForm";

const RegisterPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('./background1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "xl",
          boxShadow: 4,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <RegisterForm />
      </Box>
    </Box>
  );
};

export default RegisterPage;
