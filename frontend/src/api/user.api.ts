import { User, UserCreate } from "../interfaces/user.interface";
import { client } from "./api";
export const getUsers = async () => {
  const result = await client({
    method: "GET",
    url: "/users",
  });
  return result.data;
};

export const getUser = async (id: string) => {
  const result = await client({
    method: "GET",
    url: `/users/${id}`,
  });
  return result.data;
};

export const deleteUser = async (id: string) => {
  const result = await client({
    method: "DELETE",
    url: `/users/${id}`,
  });
  return result.data;
};

export const updateUser = async (id: string, user: User) => {
  const result = await client({
    method: "PATCH",
    url: `/users/${id}`,
    data: user,
  });
  return result.data;
};

export const addUser = async (user: UserCreate) => {
  const result = await client({
    method: "POST",
    url: "/users/register",
    data: user,
  });
  return result.data;
};
