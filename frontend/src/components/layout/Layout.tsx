import { Box } from "@mui/material";
import Header from "./Header.tsx";
import SideMenu from "./SideMenu.tsx";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <SideMenu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px", // высота AppBar
          ml: "240px", // ширина Drawer
          backgroundColor: "#f4f6f8",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
