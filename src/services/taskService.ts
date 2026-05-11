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

type CreateTaskParams = {
  projectId: string;
  title: string;
  description: string | null;
  due_date: string | null;
};

/**
 * タスクを作成する.
 *
 * Args:
 *   params:
 *     タスク作成パラメータ.
 *
 * Returns:
 *   Promise<Task>:
 *     作成したタスク.
 */
export const createTask = async (params: CreateTaskParams): Promise<Task> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await client.post<Task>(
    `/projects/${params.projectId}/tasks`,
    {
      title: params.title,
      description: params.description,
      due_date: params.due_date,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

type MoveTaskColumnParams = {
  taskId: string;
  columnId: string;
};

/**
 * タスクを別カラムへ移動する.
 *
 * Args:
 *   params:
 *     タスク移動パラメータ.
 *
 * Returns:
 *   Promise<Task>:
 *     移動後のタスク.
 */
export const moveTaskColumn = async (
  params: MoveTaskColumnParams,
): Promise<Task> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await client.patch<Task>(
    `/tasks/${params.taskId}/column`,
    {
      column_id: params.columnId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};
