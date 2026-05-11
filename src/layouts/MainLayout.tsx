import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/organisms/Header";

/**
 * 認証後画面の共通レイアウトを表示する.
 *
 * Returns:
 *   JSX.Element:
 *     共通レイアウト.
 */
export const MainLayout = () => {
  return (
    <Box minH="100vh">
      <Header />

      <Box as="main" p={8}>
        <Outlet />
      </Box>
    </Box>
  );
};
