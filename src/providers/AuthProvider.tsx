import { useQuery } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { fetchMe } from "@/services/authService";
import type { User } from "@/types/user";
import { AuthContext } from "./AuthContext";

type Props = {
  children: ReactNode;
};

/**
 * ログイン状態を管理するProvider.
 *
 * Args:
 *   children:
 *     子コンポーネント.
 *
 * Returns:
 *   JSX.Element:
 *     AuthProviderコンポーネント.
 */
export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const meQuery = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    retry: false,
  });

  const authenticatedUser = currentUser ?? meQuery.data ?? null;

  const isAuthenticated = authenticatedUser !== null;

  /** ログイン状態に更新する. */
  const login = async (): Promise<void> => {
    const user = await fetchMe();
    setCurrentUser(user);
  };

  /** ログアウト状態に更新する. */
  const logout = (): void => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: authenticatedUser,
        isAuthenticated,
        isLoading: meQuery.isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
