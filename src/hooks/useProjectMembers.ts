import { useQuery } from "@tanstack/react-query";

import { fetchProjectMembers } from "../services/projectMemberService";

/**
 * プロジェクトメンバー一覧状態を管理する.
 *
 * Args:
 *   projectId:
 *     プロジェクトID.
 *
 * Returns:
 *   object:
 *     プロジェクトメンバー一覧, エラー状態, 再取得処理.
 */
export const useProjectMembers = (projectId: string | undefined) => {
  const query = useQuery({
    queryKey: ["projectMembers", projectId],
    queryFn: async () => {
      if (!projectId) {
        return [];
      }
      return fetchProjectMembers(projectId);
    },
    enabled: Boolean(projectId),
  });

  return {
    projectMembers: query.data ?? [],
    errorMessage: query.isError ? "メンバー一覧の取得に失敗しました." : "",
    reloadProjectMembers: query.refetch,
  };
};
