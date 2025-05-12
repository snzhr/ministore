import type { UserCredentials } from "../models/user";
import { api } from "./axios.api";

type LoginResponse = {
    access_token: string;
  };
  
  export async function login(credentials: UserCredentials): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>('/auth/login', credentials);
    return res.data;
  }
  

  export async function getUser() {
    const res = await api.get("/auth/profile");
    return res.data;
}