import {
  Box,
  Button,
  Dialog,
  Heading,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { fetchProjects } from "../../services/projectService";
import type { Project } from "../../types/project";
import { ProjectCreateForm } from "../molecules/ProjectCreateForm";
import { ProjectList } from "../organisms/ProjectList";

/**
 * ホーム画面を表示する.
 *
 * Returns:
 *   JSX.Element:
 *     ホーム画面.
 */
export const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    /**
     * 初期表示用にプロジェクト一覧を読み込む.
     */
    const loadInitialProjects = async (): Promise<void> => {
      try {
        const fetchedProjects = await fetchProjects();

        if (isMounted) {
          setProjects(fetchedProjects);
        }
      } catch {
        if (isMounted) {
          setErrorMessage("プロジェクト一覧の取得に失敗しました.");
        }
      }
    };

    void loadInitialProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * プロジェクト一覧を再読み込みする.
   */
  const reloadProjects = async (): Promise<void> => {
    try {
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects);
      setErrorMessage("");
    } catch {
      setErrorMessage("プロジェクト一覧の取得に失敗しました.");
    }
  };

  return (
    <Stack gap={8}>
      <Box>
        <Heading mb={6}>プロジェクト一覧</Heading>

        {errorMessage ? (
          <Text color="red.500">{errorMessage}</Text>
        ) : (
          <ProjectList
            projects={projects}
            onClickCreate={() => setIsCreateDialogOpen(true)}
          />
        )}
      </Box>

      <Dialog.Root
        open={isCreateDialogOpen}
        onOpenChange={(event) => setIsCreateDialogOpen(event.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>プロジェクト作成</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <ProjectCreateForm
                  onCreated={reloadProjects}
                  onClose={() => setIsCreateDialogOpen(false)}
                />
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">閉じる</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};
