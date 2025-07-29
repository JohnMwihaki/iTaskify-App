import { Box, CssBaseline, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../componets/Header";
import Footer from "../componets/Footer";

export default function PublicLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      <Footer/>
    </Box>
  );
}
