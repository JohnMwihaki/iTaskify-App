import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const drawerWidth = 250;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Active Tasks", icon: <AssignmentIcon />, path: "/tasks" },
  { text: "New Task", icon: <AddIcon />, path: "/tasks/new" },
  { text: "Completed", icon: <DoneAllIcon />, path: "/completed" },
  { text: "Trash", icon: <DeleteIcon />, path: "/trash" },
];

const Sidebar = ({
  mobileOpen,
  handleDrawerToggle,
}: {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContent = (
    <Box
      sx={{
        background: "linear-gradient(180deg, #1e1e2f 0%, #1a1a26 100%)",
        height: "100%",
        color: "var(--smoke-white)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ textAlign: "center", py: 3 }}>
        <img
          src="/hero.jpg"
          alt="Tasky Logo"
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: "2px solid var(--amber)",
          }}
        />
        <Typography
          variant="h6"
          fontWeight={700}
          mt={1}
          sx={{ color: "var(--amber)" }}
        >
          iTaskify
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.15)", mx: 2 }} />

      <List sx={{ mt: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) handleDrawerToggle();
                }}
                sx={{
                  mx: 1.5,
                  my: 0.5,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,193,7,0.15)",
                    color: "var(--amber)",
                  },
                  "&.Mui-selected .MuiListItemIcon-root": {
                    color: "var(--amber)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "var(--amber)" : "rgba(255,255,255,0.8)",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box
        sx={{
          textAlign: "center",
          py: 2,
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        © {new Date().getFullYear()} Tasky
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "none",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
