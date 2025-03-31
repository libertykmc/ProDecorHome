import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../interfaces/user.interface.ts";
import { getUser, updateUser } from "../../api/user.api.ts";

const EditUserPage = () => {
  const id = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUser(id);
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        await updateUser(id, user);
        navigate(`/${id}`);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h2>Редактирование пользователя</h2>
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
          name="role"
          value={user.role}
          onChange={handleChange}
          placeholder="Роль"
        />
        <br />
        <button type="submit" style={{ marginRight: "10px" }}>
          Сохранить
        </button>
        <button type="button" onClick={() => navigate(`/${id}`)}>
          Отмена
        </button>
      </form>
    </div>
  );
};

export default EditUserPage;
