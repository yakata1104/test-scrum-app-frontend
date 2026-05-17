import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

import { useAuth } from "../providers/AuthContext";

/**
 * 認証済みユーザーのみアクセス可能なRoute.
 *
 * Returns:
 *   JSX.Element:
 *     認可済み画面、またはリダイレクト.
 */
export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
