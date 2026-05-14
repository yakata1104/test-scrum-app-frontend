import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { RegisterForm } from "../molecules/RegisterForm";

/**
 * ユーザー登録画面を表示する.
 *
 * Returns:
 *   JSX.Element:
 *     ユーザー登録画面.
 */
export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <Box maxW="md" mx="auto" mt={16} p={8}>
      <Stack gap={6}>
        <Heading>ユーザー登録</Heading>

        <RegisterForm />

        <Stack gap={2}>
          <Text color="gray.500" fontSize="sm">
            既にアカウントをお持ちですか?
          </Text>

          <Button variant="ghost" onClick={() => navigate("/login")}>
            ログイン画面へ
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
