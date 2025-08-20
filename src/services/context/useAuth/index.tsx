import { createContext, useContext } from "react";
import type { AuthContextData } from "./types";

export const AuthContext = createContext<AuthContextData | null>(null);

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context) throw new Error("useAuth must be used within an AuthProvider.");

	return context;
}
