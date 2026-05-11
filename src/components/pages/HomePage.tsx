import { Box, Heading } from "@chakra-ui/react";

import { ProjectList } from "../organisms/ProjectList";

/**
 * ホーム画面を表示する.
 *
 * Returns:
 *   JSX.Element:
 *     ホーム画面.
 */
export const HomePage = () => {
  return (
    <Box>
      <Heading mb={6}>プロジェクト一覧</Heading>
      <ProjectList />
    </Box>
  );
};
