import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("accessToken"),
  );

  const isAuthenticated = accessToken !== null;

  const login = (newAccessToken: string, newRefreshToken: string) => {
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    setAccessToken(newAccessToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 認証情報を取得するhook.
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
