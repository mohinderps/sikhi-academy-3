import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import { useEffect } from "react";
import { initGA } from "./utils/analytics";

const router = createBrowserRouter(routes);

const App = () => {
  useEffect(() => {
    initGA();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
