import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import { useEffect } from "react";
import ToastProvider from "./context/ToastProvider";
import { getUser } from "./apis/auth.api";
import { useQuery } from "@tanstack/react-query";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (!token) {
      // navigate("/login");
    } 
  }, []);

  return (
    <ToastProvider>
      <Header  />
      <Outlet />
    </ToastProvider>
  );
}

export default App;
