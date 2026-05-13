import { client } from "../api/client";
import type { TaskComment } from "../types/taskComment";

/**
 * タスクコメント一覧を取得する.
 *
 * Args:
 *   taskId:
 *     タスクID.
 *
 * Returns:
 *   Promise<TaskComment[]>:
 *     タスクコメント一覧.
 */
export const fetchTaskComments = async (
  taskId: string,
): Promise<TaskComment[]> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await client.get<TaskComment[]>(
    `/tasks/${taskId}/comments`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

type CreateTaskCommentParams = {
  taskId: string;
  content: string;
};

/**
 * タスクコメントを作成する.
 *
 * Args:
 *   params:
 *     タスクコメント作成パラメータ.
 *
 * Returns:
 *   Promise<TaskComment>:
 *     作成したタスクコメント.
 */
export const createTaskComment = async (
  params: CreateTaskCommentParams,
): Promise<TaskComment> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await client.post<TaskComment>(
    `/tasks/${params.taskId}/comments`,
    {
      content: params.content,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

/**
 * タスクコメントを削除する.
 *
 * Args:
 *   taskId:
 *     タスクID.
 *   commentId:
 *     削除対象のコメントID.
 */
export const deleteTaskComment = async (
  taskId: string,
  commentId: string,
): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");

  await client.delete(`/tasks/${taskId}/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
