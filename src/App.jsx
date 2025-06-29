import Gold from "./Pages/Gold";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Currency from "./Pages/Currency";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Crypto from "./Pages/Crypto";
import Coin from "./Pages/Coin";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Films from "./Pages/Films";
const query = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Gold />} />
      <Route path="/currency" element={<Currency />} />
      <Route path="/cryptoPrice" element={<Crypto />} />
      <Route path="/coin/:id" element={<Coin />} />
      <Route path="/films" element={<Films />} />
    </Route>
  )
);
const App = () => {
  useEffect(() => {
    toast("خوش آمدید", {
      position: "top-center",
      className: "toast-message",
    });
  }, []);
  return (
    <div>
      <QueryClientProvider client={query}>
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
