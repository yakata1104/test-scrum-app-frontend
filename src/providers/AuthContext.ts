import { createContext, useContext } from "react";

import type { User } from "@/types/user";

type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

/**
 * 認証情報を取得する.
 *
 * Returns:
 *   AuthContextType:
 *     認証コンテキスト.
 */
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useAuth は AuthProvider の中で使用してください.");
  }

  return authContext;
};
