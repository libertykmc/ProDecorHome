import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { UserCreate, UserLogin } from "../../interfaces/user.interface";
import { addUser, loginUser } from "../../api/user.api";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  mode: "login" | "register";
}

const LoginModal = ({ open, onClose, mode }: LoginModalProps) => {
  const isLogin = mode === "login";

  const [dataRegister, setDataRegister] = useState<UserCreate>({
    login: "",
    password: "",
    name: "",
    surname: "",
    role: "user",
  });

  const [dataLogin, setDataLogin] = useState<UserLogin>({
    login: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = isLogin
        ? await loginUser(dataLogin)
        : await addUser(dataRegister);

      localStorage.setItem("token", res.token);
      localStorage.setItem("id", res.id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs" // Ограничим ширину модального окна
    >
      <DialogTitle>{isLogin ? "Вход в систему" : "Регистрация"}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 2,
        }}
      >
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          margin="dense"
          value={dataLogin.login}
          onChange={(e) => {
            setDataLogin({ ...dataLogin, login: e.target.value });
            setDataRegister({ ...dataRegister, login: e.target.value });
          }}
          inputProps={{
            style: { overflow: "hidden", textOverflow: "ellipsis" },
          }}
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          value={dataLogin.password}
          onChange={(e) => {
            setDataLogin({ ...dataLogin, password: e.target.value });
            setDataRegister({ ...dataRegister, password: e.target.value });
          }}
        />
        {!isLogin && (
          <TextField
            label="Имя"
            type="text"
            fullWidth
            value={dataRegister.name}
            onChange={(e) =>
              setDataRegister({ ...dataRegister, name: e.target.value })
            }
          />
        )}
        {!isLogin && (
          <TextField
            label="Фамилия"
            type="text"
            fullWidth
            value={dataRegister.surname}
            onChange={(e) =>
              setDataRegister({ ...dataRegister, surname: e.target.value })
            }
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
