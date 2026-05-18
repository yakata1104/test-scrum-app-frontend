import { client } from "../api/client";
import type { ProjectMember } from "../types/projectMember";

/**
 * プロジェクトメンバー一覧を取得する.
 *
 * Args:
 *   projectId:
 *     プロジェクトID.
 *
 * Returns:
 *   Promise<ProjectMember[]>:
 *     プロジェクトメンバー一覧.
 */
export const fetchProjectMembers = async (
  projectId: string,
): Promise<ProjectMember[]> => {
  const response = await client.get<ProjectMember[]>(
    `/projects/${projectId}/members`,
  );

  return response.data;
};

type AddProjectMemberParams = {
  projectId: string;
  email: string;
};

/**
 * プロジェクトメンバーを追加する.
 *
 * Args:
 *   params:
 *     プロジェクトメンバー追加パラメータ.
 *
 * Returns:
 *   Promise<ProjectMember>:
 *     追加したプロジェクトメンバー.
 */
export const addProjectMember = async (
  params: AddProjectMemberParams,
): Promise<ProjectMember> => {
  const response = await client.post<ProjectMember>(
    `/projects/${params.projectId}/members`,
    {
      email: params.email,
    },
  );

  return response.data;
};

/**
 * プロジェクトメンバーを削除する.
 *
 * Args:
 *   projectId:
 *     プロジェクトID.
 *   userId:
 *     削除対象ユーザーID.
 */
export const deleteProjectMember = async (
  projectId: string,
  userId: string,
): Promise<void> => {
  await client.delete(`/projects/${projectId}/members/${userId}`);
};
