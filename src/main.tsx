import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App.tsx";
import Details from "./components/Details.tsx";
import Admin from "./components/admin/Admin.tsx";
import "./utils/i18n";
import Login from "./components/admin/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
