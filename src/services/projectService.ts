import { client } from "../api/client";
import type { Project } from "../types/project";

/**
 * プロジェクト一覧を取得する.
 *
 * Returns:
 *   Promise<Project[]>:
 *     プロジェクト一覧.
 */
export const fetchProjects = async (): Promise<Project[]> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await client.get<Project[]>("/projects", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
