import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

import { ProjectList } from "../organisms/ProjectList";
import { useProjects } from "@/hooks/useProject";
import { ProjectCreateDialog } from "../organisms/ProjectCreateDialog";

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
      <ProjectCreateDialog
        open={isCreateDialogOpen}
        onCreated={async () => {
          await reloadProjects();
        }}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </Stack>
  );
};
