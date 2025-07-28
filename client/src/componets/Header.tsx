import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Tooltip,
  InputBase,
  Stack,
} from "@mui/material";
import {
  LightMode,
  DarkMode,
  Menu as MenuIcon,
  GitHub,
  LinkedIn,
  Twitter,
  ArrowOutward,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const renderDrawer = () => (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <Box sx={{ width: 250, p: 1 }}>
        <List>
          <ListItem>
            <Typography variant="h6" fontWeight="bold">
              iTaskify
            </Typography>
          </ListItem>
          <Divider />
          {isAuthenticated && (
            <ListItem>
              <Avatar src={user?.avatar || ""}>
                {!user?.avatar && user?.firstName?.[0]}
              </Avatar>
              <Box ml={2}>
                <Typography variant="body2">
                  {user?.firstName ? `Welcome, ${user.firstName}` : "Welcome"}
                </Typography>
              </Box>
            </ListItem>
          )}
          {!isAuthenticated && (
            <>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemText primary="Home" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/about")}>
                <ListItemText primary="About" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/features")}>
                <ListItemText primary="Features" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/contact")}>
                <ListItemText primary="Contact" />
              </ListItemButton>
              <Divider />
              <ListItemButton onClick={() => navigate("/login")}>
                <ListItemText primary="Sign In" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/register")}>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );

  const renderTopBar = () => (
    <Toolbar
      sx={{
        justifyContent: "flex-end",
        bgcolor: "var(--light-grey)",
        px: 2,
        py: 0.5,
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        mt: 1,
      }}
    >
      <InputBase
        placeholder="Search..."
        sx={{
          bgcolor: "var(--smoke-white)",
          px: 1,
          py: 0.2,
          borderRadius: 1,
          mr: 2,
          fontSize: "0.85rem",
          width: "200px",
        }}
      />
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="GitHub">
          <IconButton
            size="small"
            href="https://github.com/JOHNMwihaki"
            target="_blank"
            sx={{
              bgcolor: "white",
              border: "1px solid var(--smoke-white)",
              "&:hover": { bgcolor: "var(--amber)", color: "white" },
              borderRadius: "50%",
            }}
          >
            <GitHub fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="LinkedIn">
          <IconButton
            size="small"
            href="https://linkedin.com/in/JOHNMwihaki"
            target="_blank"
            sx={{
              bgcolor: "white",
              border: "1px solid var(--smoke-white)",
              "&:hover": { bgcolor: "var(--amber)", color: "white" },
              borderRadius: "50%",
            }}
          >
            <LinkedIn fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Twitter">
          <IconButton
            size="small"
            href="https://twitter.com/JohnMwihaki"
            target="_blank"
            sx={{
              bgcolor: "white",
              border: "1px solid var(--smoke-white)",
              "&:hover": { bgcolor: "var(--amber)", color: "white" },
              borderRadius: "50%",
            }}
          >
            <Twitter fontSize="small" />
          </IconButton>
        </Tooltip>

        <IconButton
          onClick={toggleDarkMode}
          size="small"
          sx={{
            bgcolor: "white",
            border: "1px solid var(--smoke-white)",
            "&:hover": { bgcolor: "var(--amber)", color: "white" },
            borderRadius: "50%",
          }}
        >
          {darkMode ? (
            <LightMode fontSize="small" />
          ) : (
            <DarkMode fontSize="small" />
          )}
        </IconButton>

        {!isAuthenticated && (
          <Button
            onClick={() => navigate("/explore")}
            endIcon={<ArrowOutward sx={{ fontSize: "14px" }} />}
            sx={{
              bgcolor: "var(--amber)",
              color: "var(--smoke-white)",
              fontWeight: 600,
              px: 2.5,
              py: 0.8,
              borderRadius: "20px",
              textTransform: "capitalize",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              "&:hover": {
                bgcolor: "var(--golden-yellow)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Explore
          </Button>
        )}
      </Stack>
    </Toolbar>
  );

  const renderMainBar = () => (
    <Toolbar
      sx={{
        justifyContent: "space-between",
        bgcolor: "var(--orange)",
        px: 2,
        py: 1,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      {isMobile ? (
        <IconButton edge="start" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      ) : (
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "var(--dark-blue)",
            cursor: "pointer",
            letterSpacing: "1px",
          }}
          onClick={() => navigate("/")}
        >
          iTaskify
        </Typography>
      )}

      {!isMobile && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            background: "var(--light-grey)",
            borderRadius: "40px",
            px: 2,
            py: 0.5,
            boxShadow: "inset 0px 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {["Home", "About", "Features", "Contact"].map((link) => (
            <Button
              key={link}
              onClick={() =>
                navigate(link === "Home" ? "/" : `/${link.toLowerCase()}`)
              }
              sx={{
                color: "var(--soft-sand)",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  borderBottom: "2px solid var(--red)",
                  bgcolor: "var(--amber)",
                  borderRadius: "30px",
                },
              }}
            >
              {link}
            </Button>
          ))}
        </Stack>
      )}

      {!isAuthenticated ? (
        <Stack direction="row" spacing={1}>
          <Button
            onClick={() => navigate("/login")}
            sx={{
              color: "var(--dark)",
              fontWeight: 600,
              "&:hover": {
                borderBottom: "2px solid var(--red)",
                bgcolor: "var(--amber)",
                borderRadius: "30px",
              },
            }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/register")}
            sx={{
              bgcolor: "var(--amber)",
              color: "white",
              fontWeight: 600,
              px: 2,
              borderRadius: "30px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
              "&:hover": {
                borderBottom: "2px solid var(--red)",
                bgcolor: "var(--golden-yellow)",
              },
            }}
          >
            Sign Up
          </Button>
        </Stack>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Tooltip title="Account settings">
            <IconButton onClick={handleAvatarClick} size="small">
              <Avatar src={user?.avatar?user.avatar:undefined}>
                {!user?.avatar && `${user?.firstName?.[0]}  ${user?.lastName?.[0]}`}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.8rem", fontWeight: 500, mt: 0.3 }}
          >
            {  user?.firstName? `Welcome, ${user.firstName}` : "Welcome"}
          </Typography>
        </Box>
      )}
    </Toolbar>
  );

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      {renderTopBar()}
      {renderMainBar()}
      {renderDrawer()}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
            handleMenuClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            handleMenuClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
