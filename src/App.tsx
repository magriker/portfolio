import { createBrowserRouter, RouterProvider } from "react-router";
import User from "./pages/User.tsx";
import Details from "./pages/Details.tsx";
import Admin from "./pages/Admin.tsx";
import "./utils/i18n.ts";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <User></User>,
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
