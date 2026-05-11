import { Box, Heading } from "@chakra-ui/react";

import { LoginForm } from "../molecules/LoginForm";

export const LoginPage = () => {
  return (
    <Box maxW="md" mx="auto" mt={16} p={8}>
      <Heading mb={6}>ログイン</Heading>
      <LoginForm />
    </Box>
  );
};
