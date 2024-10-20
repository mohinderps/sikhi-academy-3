import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import { useEffect } from "react";
import { initGA } from "./utils/analytics";

const router = createBrowserRouter(routes);

const App = () => {
  useEffect(() => {
    initGA(import.meta.env.VITE_GA_MEASUREMENT_ID);
    console.log("1", import.meta.env);
    console.log("2", process.env);
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
