import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCreate } from "../../interfaces/user.interface.ts";
import { addUser } from "../../api/user.api.ts";

const AddUserPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserCreate>({
    name: "",
    surname: "",
    login: "",
    role: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser(user);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Добавление нового пользователя</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Имя"
        />
        <br />
        <input
          name="surname"
          value={user.surname}
          onChange={handleChange}
          placeholder="Фамилия"
        />
        <br />
        <input
          name="login"
          value={user.login}
          onChange={handleChange}
          placeholder="Email"
        />
        <br />

        <input
          name="password"
          placeholder="Пароль"
          value={user.password}
          onChange={handleChange}
        />
        <br />
        <input
          name="role"
          value={user.role}
          onChange={handleChange}
          placeholder="Роль"
        />
        <br />
        <button type="submit" style={{ marginRight: "10px" }}>
          Добавить
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Отмена
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
