import { useQuery } from "@tanstack/react-query";

import { fetchTaskAssignees } from "@/services/taskAssigneeService";

/**
 * タスク担当者一覧状態を管理する.
 *
 * Args:
 *   taskId:
 *     タスクID.
 *
 * Returns:
 *   object:
 *     タスク担当者一覧, 再取得処理.
 */
export const useTaskAssignees = (taskId: string | null) => {
  const query = useQuery({
    queryKey: ["taskAssignees", taskId],
    queryFn: async () => {
      if (!taskId) {
        return [];
      }
      return fetchTaskAssignees(taskId);
    },
    enabled: Boolean(taskId),
  });

  return {
    taskAssignees: query.data ?? [],
    reloadTaskAssignees: query.refetch,
  };
};
