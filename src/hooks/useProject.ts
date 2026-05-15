import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import { fetchProjects } from "../services/projectService";

/**
 * プロジェクト一覧状態を管理する.
 *
 * Returns:
 *  object:
 *    プロジェクト一覧,エラーメッセージ,再読み込み処理
 */
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * プロジェクト一覧を再読み込みする.
   */
  const reloadProjects = async (): Promise<void> => {
    try {
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
      setErrorMessage("");
    } catch {
      setErrorMessage("プロジェクト一覧の取得に失敗しました.");
    }
  };

  useEffect(() => {
    let isMounted = true;

    /**
     * 初期表示用にプロジェクト一覧を読み込む.
     */
    const loadInitialProjects = async (): Promise<void> => {
      try {
        const fetchedProjects = await fetchProjects();

        if (isMounted) {
          setProjects(fetchedProjects);
        }
      } catch {
        if (isMounted) {
          setErrorMessage("プロジェクト一覧の取得に失敗しました.");
        }
      }
    };

    void loadInitialProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    projects,
    errorMessage,
    reloadProjects,
  };
};
