import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "../components/pages/HomePage";
import { LoginPage } from "../components/pages/LoginPage";
import { ProjectBoardPage } from "../components/pages/ProjectBoardPage";
import { ProjectMembersPage } from "../components/pages/ProjectMembersPage";
import { MainLayout } from "../layouts/MainLayout";
import { ProjectLayout } from "../layouts/ProjectLayout";
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

            <Route path="/projects/:projectId" element={<ProjectLayout />}>
              <Route index element={<Navigate to="board" replace />} />
              <Route path="board" element={<ProjectBoardPage />} />
              <Route path="members" element={<ProjectMembersPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
