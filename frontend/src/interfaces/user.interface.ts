export interface User {
  id: string;
  name: string;
  surname: string;
  login: string;
  role: string;
}

export interface UserCreate extends Omit<User, "id"> {
  password: string;
}

export interface UserLogin {
  login: string;
  password: string;
}
