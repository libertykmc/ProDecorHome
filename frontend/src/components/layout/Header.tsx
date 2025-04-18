import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import LoginModal from "./LoginModal";
import { useEffect, useState } from "react";
import { getUser } from "../../api/user.api";
import { User } from "../../interfaces/user.interface";

type AuthMode = "login" | "register";

const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [user, setUser] = useState<User>();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const handleOpenModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setLoginOpen(true);
  };

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const res = await getUser(id);
          setUser(res);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, []);
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Prodecor
          </Typography>
          <Box>
            {token ? (
              <Typography variant="subtitle1">{user?.name}</Typography>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => handleOpenModal("login")}
                >
                  Вход
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleOpenModal("register")}
                >
                  Регистрация
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <LoginModal
        open={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        mode={authMode}
      />
    </>
  );
};

export default Header;
