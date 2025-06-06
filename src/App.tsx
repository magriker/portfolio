import { createBrowserRouter, RouterProvider } from "react-router";
import User from "./User.tsx";
import Details from "./components/Details.tsx";
import Admin from "./components/admin/Admin.tsx";
import "./utils/i18n.ts";
import Login from "./components/admin/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <User></User>,
  },
  {
    path: "/details",
    element: <Details></Details>,
  },
  {
    path: "/details/:productId",
    element: <Details></Details>,
  },
  {
    path: "/admin",
    element: <Admin></Admin>,
  },
  {
    path: "/admin/login",
    element: <Login></Login>,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
