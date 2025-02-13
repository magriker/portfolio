import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App.tsx";
import Details from "./components/Details.tsx";
import Admin from "./components/admin/Admin.tsx";
import Create from "./components/admin/create.tsx";

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
    path: "/admin/create",
    element: <Create></Create>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
