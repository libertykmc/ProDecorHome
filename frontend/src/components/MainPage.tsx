import { useContext } from "react";
import { UserContext } from "../context/UserContext.tsx";
import { User } from "../interfaces/user.interface.ts";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const showInfo = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div>
      <h1>Список пользователей</h1>
      <ul>
        {context?.users.map((user: User) => (
          <li key={user.id}>
            {user.name} {user.surname}
            <button
              onClick={() => showInfo(user.id)}
              style={{ marginLeft: "10px" }}
            >
              Просмотр
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/addUser")}>
        Добавить нового пользователя
      </button>
    </div>
  );
};

export default MainPage;
