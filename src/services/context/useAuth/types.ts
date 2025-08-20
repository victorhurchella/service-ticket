import type { ILogin } from "@/services/hooks/auth/types";
import type { User } from "@/types";

export type TToken = string | null;

export type AuthContextData = {
  login: (payload: ILogin) => Promise<void>;
  logout: () => Promise<void>;

  token: TToken;
  user: User | null;
};
