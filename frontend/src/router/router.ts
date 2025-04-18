import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import UserPage from "../components/pages/UserPage.tsx";
import EditUserPage from "../components/user/EditUserPage.tsx";
import MainPage from "../components/pages/MainPage.tsx";
import AddUserPage from "../components/user/AddUserPage.tsx";
import Stuff from "../components/pages/StuffPage.tsx";
import HelloPage from "../components/pages/HelloPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/admin",
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
      {
        path: "stuff",
        Component: Stuff,
      },
      {
        path: "helloPage",
        Component: HelloPage,
      },
    ],
  },
]);
