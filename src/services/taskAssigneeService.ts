import { client } from "../api/client";
import type { TaskAssignee } from "../types/taskAssignee";

/**
 * タスク担当者一覧を取得する.
 *
 * Args:
 *   taskId:
 *     タスクID.
 *
 * Returns:
 *   Promise<TaskAssignee[]>:
 *     タスク担当者一覧.
 */
export const fetchTaskAssignees = async (
  taskId: string,
): Promise<TaskAssignee[]> => {
  const response = await client.get<TaskAssignee[]>(
    `/tasks/${taskId}/assignees`,
  );

  return response.data;
};

type AddTaskAssigneeParams = {
  taskId: string;
  userId: string;
};

/**
 * タスク担当者を追加する.
 *
 * Args:
 *   params:
 *     タスク担当者追加パラメータ.
 *
 * Returns:
 *   Promise<TaskAssignee>:
 *     追加したタスク担当者.
 */
export const addTaskAssignee = async (
  params: AddTaskAssigneeParams,
): Promise<TaskAssignee> => {
  const response = await client.post<TaskAssignee>(
    `/tasks/${params.taskId}/assignees`,
    {
      user_id: params.userId,
    },
  );

  return response.data;
};

/**
 * タスク担当者を削除する.
 *
 * Args:
 *   taskId:
 *     タスクID.
 *   userId:
 *     削除対象のユーザーID.
 */
export const deleteTaskAssignee = async (
  taskId: string,
  userId: string,
): Promise<void> => {
  await client.delete(`/tasks/${taskId}/assignees/${userId}`);
};
