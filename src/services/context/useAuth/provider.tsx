import { queryClient } from "@/services/api";
import { useLogin } from "@/services/hooks/auth";
import type { ILogin } from "@/services/hooks/auth/types";
import type { User } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./index";
import type { AuthContextData } from "./types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { mutateAsync: postLogin } = useLogin();

  const [user, setUser] = useState<User | null>(null);
  const token = window.localStorage.getItem("token") || null;

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      setUser(JSON.parse(storedUser));
    }
  }, [user]);

  const login = useCallback(async (payload: ILogin) => {
    const { access_token, user } = await postLogin(payload);

    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

    return;
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.invalidateQueries();
    setUser(null);

    return;
  }, []);

  const value: AuthContextData = useMemo(
    () => ({ login, logout, token, user }),
    [login, logout, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
