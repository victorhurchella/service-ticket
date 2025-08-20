import { api } from "@/services/api";
import type { IAutomationReturn } from "./types";

export async function postAutomation() {
  const { data } = await api.post<IAutomationReturn>("/automation/run-now");
  return data;
}
