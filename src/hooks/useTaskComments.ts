import { useQuery } from "@tanstack/react-query";

import { fetchTaskComments } from "@/services/taskCommentService";

/**
 * タスクコメント一覧状態を管理する.
 *
 * Args:
 *   taskId:
 *     タスクID.
 *
 * Returns:
 *   object:
 *     タスクコメント一覧, 再取得処理.
 */
export const useTaskComments = (taskId: string | null) => {
  const query = useQuery({
    queryKey: ["taskComments", taskId],
    queryFn: async () => {
      if (!taskId) {
        return [];
      }

      return fetchTaskComments(taskId);
    },
    enabled: Boolean(taskId),
  });

  return {
    taskComments: query.data ?? [],
    reloadComments: query.refetch,
  };
};
