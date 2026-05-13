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
  const accessToken = localStorage.getItem("accessToken");

  const response = await client.get<ProjectMember[]>(
    `/projects/${projectId}/members`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};
