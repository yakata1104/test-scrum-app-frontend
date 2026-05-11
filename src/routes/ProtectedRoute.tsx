import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";

/**
 * 認証済みユーザーのみアクセス可能なRoute.
 *
 * Returns:
 *   JSX.Element:
 *     認可済み画面、またはリダイレクト.
 */
export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
