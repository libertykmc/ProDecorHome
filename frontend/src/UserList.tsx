import { useState, useEffect } from "react";

interface User {
  name: string;
  surname: string;
  login: string;
  password: string;
}

const userList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("http://localhost:3000/api/users/")
      .then((response) => response.json())
      .then((data: User[]) => {
        console.log(data);
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Список пользователей</h1>
      <ul>
        {users.map((user) => (
          <li key={user.login}>
            {user.name} {user.surname} ({user.login})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default userList;
