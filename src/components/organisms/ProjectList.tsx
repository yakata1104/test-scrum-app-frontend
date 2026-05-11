import { Box, Card, Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchProjects } from "../../services/projectService";
import type { Project } from "../../types/project";

/**
 * プロジェクト一覧を表示する.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクト一覧.
 */
export const ProjectList = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    /**
     * プロジェクト一覧を読み込む.
     */
    const loadProjects = async (): Promise<void> => {
      try {
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
      } catch {
        setErrorMessage("プロジェクト一覧の取得に失敗しました.");
      }
    };

    void loadProjects();
  }, []);

  if (errorMessage) {
    return <Text color="red.500">{errorMessage}</Text>;
  }

  if (projects.length === 0) {
    return <Text color="gray.500">プロジェクトがありません.</Text>;
  }

  return (
    <Stack gap={4}>
      {projects.map((project) => (
        <Card.Root
          key={project.id}
          cursor="pointer"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          <Card.Body>
            <Heading size="md">{project.name}</Heading>

            {project.description && (
              <Text mt={2} color="gray.600">
                {project.description}
              </Text>
            )}

            <Box mt={3}>
              <Text fontSize="sm" color="gray.500">
                作成日: {new Date(project.created_at).toLocaleString()}
              </Text>
            </Box>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
};
