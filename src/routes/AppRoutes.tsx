import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "../components/pages/HomePage";
import { LoginPage } from "../components/pages/LoginPage";
import { ProjectPage } from "../components/pages/ProjectPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
};
