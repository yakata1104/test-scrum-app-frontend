import { Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../providers/AuthProvider";
import { login as loginApi } from "../../services/authService";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      await loginApi({
        email,
        password,
      });

      login();

      navigate("/home");
    } catch {
      setErrorMessage("メールアドレスまたはパスワードが正しくありません。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack gap={4}>
      <Field.Root>
        <Field.Label>メールアドレス</Field.Label>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="example@example.com"
        />
      </Field.Root>

      <Field.Root>
        <Field.Label>パスワード</Field.Label>
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="password"
        />
      </Field.Root>

      {errorMessage && <Text color="red.500">{errorMessage}</Text>}

      <Button colorPalette="blue" loading={isLoading} onClick={handleLogin}>
        ログイン
      </Button>
    </Stack>
  );
};
