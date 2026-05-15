import {
  Box,
  Button,
  Dialog,
  Heading,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { ProjectCreateForm } from "../molecules/ProjectCreateForm";
import { ProjectList } from "../organisms/ProjectList";
import { useProjects } from "@/hooks/useProject";

/**
 * ホーム画面を表示する.
 *
 * Returns:
 *   JSX.Element:
 *     ホーム画面.
 */
export const HomePage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { projects, errorMessage, reloadProjects } = useProjects();

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
