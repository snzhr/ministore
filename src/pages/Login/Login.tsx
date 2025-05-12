import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { login } from "../../apis/auth.api";

export const Login = () => {
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      queryClient.setQueryData(["auth"], { token: data.access_token });
      navigate("/products");
    },
    onError: () => {
      alert("Login failed. Please check your credentials.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
        />
        <button type="submit" disabled={isPending} className={styles.button}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
