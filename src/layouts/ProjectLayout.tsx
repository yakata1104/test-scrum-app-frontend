import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { NavLink, Outlet, useParams } from "react-router-dom";

/**
 * プロジェクト詳細画面用レイアウトを表示する.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクト詳細画面用レイアウト.
 */
export const ProjectLayout = () => {
  const { projectId } = useParams();

  return (
    <Flex minH="calc(100vh - 73px)">
      <Box borderRightWidth="1px" minW="220px" p={4}>
        <Stack gap={3}>
          <Button asChild justifyContent="flex-start" variant="ghost">
            <NavLink to={`/projects/${projectId}/board`}>タスクボード</NavLink>
          </Button>

          <Button asChild justifyContent="flex-start" variant="ghost">
            <NavLink to={`/projects/${projectId}/members`}>
              メンバー管理
            </NavLink>
          </Button>
        </Stack>
      </Box>

      <Box flex="1" p={6}>
        <Outlet />
      </Box>
    </Flex>
  );
};
