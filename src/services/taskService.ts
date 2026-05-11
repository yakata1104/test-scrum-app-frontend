import { client } from "../api/client";
import type { Task } from "../types/task";
import type { TaskColumn } from "../types/taskColumn";

/**
 * プロジェクトのタスクカラム一覧を取得する.
 *
 * Args:
 *   projectId:
 *     プロジェクトID.
 *
 * Returns:
 *   Promise<TaskColumn[]>:
 *     タスクカラム一覧.
 */
export const fetchTaskColumns = async (
  projectId: string,
): Promise<TaskColumn[]> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await client.get<TaskColumn[]>(
    `/projects/${projectId}/columns`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

/**
 * プロジェクトのタスク一覧を取得する.
 *
 * Args:
 *   projectId:
 *     プロジェクトID.
 *
 * Returns:
 *   Promise<Task[]>:
 *     タスク一覧.
 */
export const fetchTasks = async (projectId: string): Promise<Task[]> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await client.get<Task[]>(`/projects/${projectId}/tasks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
