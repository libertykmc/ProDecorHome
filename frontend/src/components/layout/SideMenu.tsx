import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const SideMenu = () => {
  const id = localStorage.getItem("id");

  const menuItems = [
    { label: "Главная", path: "/helloPage" },
    { label: "Наш ассортимент", path: "/stuff" },
    { label: "Админка", path: "/admin" },
    { label: "Профиль", path: `/${id}` },
    { label: "Выход", path: "/logout" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        ["& .MuiDrawer-paper"]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f8f9fa",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) =>
          item.label === "Выход" ? (
            <ListItemButton
              key={item.label}
              onClick={handleLogout}
              sx={{
                "&.active": {
                  backgroundColor: "#e0e0e0",
                  fontWeight: "bold",
                },
              }}
            >
              <ListItemText primary={item.label} sx={{ pl: 2 }} />
            </ListItemButton>
          ) : (
            <ListItemButton
              key={item.label}
              component={NavLink}
              to={item.path}
              sx={{
                "&.active": {
                  backgroundColor: "#e0e0e0",
                  fontWeight: "bold",
                },
              }}
            >
              <ListItemText primary={item.label} sx={{ pl: 2 }} />
            </ListItemButton>
          )
        )}
      </List>
    </Drawer>
  );
};

export default SideMenu;
