import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../providers/AuthContext";
import { logout as logoutApi } from "../../services/authService";

/**
 * 共通ヘッダーを表示する.
 *
 * Returns:
 *   JSX.Element:
 *     共通ヘッダー.
 */
export const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  /**
   * ログアウト処理を実行する.
   */
  const handleLogout = async (): Promise<void> => {
    try {
      await logoutApi();
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <Box
      as="header"
      bg="green.500"
      color="white"
      borderBottomWidth="1px"
      px={6}
      py={4}
    >
      <Flex align="center" justify="space-between">
        <Heading size="md" color="white">
          Scrum App
        </Heading>
        <Button
          bg="white"
          color="green.600"
          _hover={{ bg: "green.50" }}
          onClick={() => void handleLogout()}
        >
          ログアウト
        </Button>
      </Flex>
    </Box>
  );
};
