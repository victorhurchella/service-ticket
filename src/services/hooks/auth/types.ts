import type { User } from "@/types";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginReturn {
  access_token: string;
  user: User;
}
