import { client } from "../api/client";
import type { Project } from "../types/project";

type CreateProjectParams = {
  name: string;
  description: string | null;
};

/**
 * プロジェクト一覧を取得する.
 *
 * Returns:
 *   Promise<Project[]>:
 *     プロジェクト一覧.
 */
export const fetchProjects = async (): Promise<Project[]> => {
  const response = await client.get<Project[]>("/projects");

  return response.data;
};

/**
 * プロジェクトを作成する.
 *
 * Args:
 *   params:
 *     プロジェクト作成パラメータ.
 *
 * Returns:
 *   Promise<Project>:
 *     作成したプロジェクト.
 */
export const createProject = async (
  params: CreateProjectParams,
): Promise<Project> => {
  const response = await client.post<Project>("/projects", params);

  return response.data;
};
