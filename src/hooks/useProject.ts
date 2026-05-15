import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../services/projectService";

/**
 * プロジェクト一覧状態を管理する.
 *
 * Returns:
 *  object:
 *    プロジェクト一覧,エラーメッセージ,再読み込み処理
 */
export const useProjects = () => {
  const query = useQuery({ queryKey: ["projects"], queryFn: fetchProjects });

  return {
    projects: query.data ?? [],
    errorMessage: query.isError ? "プロジェクト一覧の取得に失敗しました." : "",
    reloadProjects: query.refetch,
  };
};
