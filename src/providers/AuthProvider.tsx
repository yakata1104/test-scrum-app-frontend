import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (): void => {
    setIsAuthenticated(true);
  };

  const logout = (): void => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
