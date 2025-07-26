import { createTheme } from "@mui/material/styles";

const taskyTheme = createTheme({
  palette: {
    primary: {
      main: "#4F46E5",
    },
    secondary: {
      main: "#F59E0B",
    },
    success: {
      main: "#10B981",
    },
    warning: {
      main: "#F97316",
    },
    error: {
      main: "#EF4444",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--primary-font": "Poppins, sans-serif",
          "--secondary-font": "'Lato', cursive, sans-serif",
          "--deep-green": "rgb(34, 93, 37)",
          "--orange": "rgba(172, 77, 18, 1)",
          "--amber": "rgba(255, 152, 0, 1)",
          "--earth-brown": "rgba(93, 64, 55, 1)",
          "--smoke-white": "rgb(255, 255, 253)",
          "--soft-sand": "rgba(245, 245, 220, 1)",
          "--stone-grey": "rgba(189, 189, 189, 1)",
          "--light-grey": "rgba(186, 128, 80, 0.22)",
          "--dark": "rgba(19, 18, 18, 0.88)",
          "--golden-yellow": "rgba(255, 213, 79, 1)",
          "--sky-blue": "rgba(54, 26, 165, 1)",
          "--light-dark-blue": "rgba(22, 55, 70, 1)",
          "--dark-blue": "rgba(22, 7, 43, 1)",
          "--red": "rgb(236, 33, 33)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          fontFamily: "var(--primary-font)",
        },
      },
    },
  },
});

export default taskyTheme;
