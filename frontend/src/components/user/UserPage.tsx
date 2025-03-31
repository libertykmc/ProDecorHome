import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/user.interface.ts";
import { deleteUser, getUser } from "../../api/user.api.ts";

const UserPage = () => {
  const id = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
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

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(location);
  if (!user) {
    return <div>Пользователь не найден </div>;
  }

  return (
    <div>
      <h2>Информация о пользователе</h2>
      <p>Имя: {user.name}</p>
      <p>Фамилия: {user.surname}</p>
      <p>Email: {user.login}</p>
      <p>Роль: {user.role}</p>
      <button
        style={{ marginRight: "10px" }}
        onClick={() => navigate(`/${id}/edit`)}
      >
        Редактировать
      </button>
      <button onClick={handleDelete} style={{ marginRight: "10px" }}>
        Удалить
      </button>
      <button onClick={() => navigate("/")}>Выход</button>
    </div>
  );
};

export default UserPage;
