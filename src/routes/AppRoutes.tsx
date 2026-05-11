import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "../components/pages/HomePage";
import { LoginPage } from "../components/pages/LoginPage";
import { ProjectPage } from "../components/pages/ProjectPage";
import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";

/**
 * アプリケーションのルーティングを定義する.
 *
 * Returns:
 *   JSX.Element:
 *     ルーティング定義.
 */
export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/projects/:projectId" element={<ProjectPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
