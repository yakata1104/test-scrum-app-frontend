import { useQuery } from "@tanstack/react-query";
import { fetchTaskColumns, fetchTasks } from "../services/taskService";

/**
 *
 */
export const useTaskBoard = (projectId: string | undefined) => {
  const query = useQuery({
    queryKey: ["taskBoard", projectId],
    queryFn: async () => {
      if (!projectId) {
        return {
          column: [],
          tasks: [],
        };
      }

      const [columns, tasks] = await Promise.all([
        fetchTaskColumns(projectId),
        fetchTasks(projectId),
      ]);

      return {
        columns,
        tasks,
      };
    },
    enabled: Boolean(projectId),
  });

  return {
    columns: query.data?.columns ?? [],
    tasks: query.data?.tasks ?? [],
    isLoading: query.isLoading,
    errorMessage: query.isError ? "タスクボードの取得に失敗しました." : "",
    reloadTaskBoard: query.refetch,
  };
};
