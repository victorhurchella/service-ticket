import { api } from "@/services/api";
import type { ILogin, ILoginReturn } from "./types";

export async function login(payload: ILogin) {
  const { data } = await api.post<ILoginReturn>("/auth/login", payload);
  return data;
}
