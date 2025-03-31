import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import UserPage from "../components/user/UserPage.tsx";
import EditUserPage from "../components/user/EditUserPage.tsx";
import MainPage from "../components/MainPage.tsx";
import AddUserPage from "../components/user/AddUserPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: MainPage,
      },
      {
        path: "addUser",
        Component: AddUserPage,
      },
      {
        path: ":userId",
        Component: UserPage,
      },
      {
        path: ":userId/edit",
        Component: EditUserPage,
      },
    ],
  },
]);
