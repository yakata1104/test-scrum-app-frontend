import { Box, Button, Card, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import type { Project } from "../../types/project";

type Props = {
  projects: Project[];
  onClickCreate: () => void;
};

/**
 * プロジェクト一覧を表示する.
 *
 * Args:
 *   projects:
 *     表示対象のプロジェクト一覧.
 *   onClickCreate:
 *     プロジェクト作成ボタン押下時の処理.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクト一覧.
 */
export const ProjectList = ({ projects, onClickCreate }: Props) => {
  const navigate = useNavigate();

  return (
    <Stack gap={4}>
      {projects.length === 0 ? (
        <Text color="gray.500">プロジェクトがありません.</Text>
      ) : (
        projects.map((project) => (
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
        ))
      )}

      <Box display="flex" justifyContent="center" pt={2}>
        <Button
          aria-label="プロジェクトを作成"
          borderRadius="full"
          colorPalette="green"
          fontSize="2xl"
          h="56px"
          w="56px"
          onClick={onClickCreate}
        >
          +
        </Button>
      </Box>
    </Stack>
  );
};
