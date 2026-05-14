import { Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../services/userService";
import { toaster } from "../ui/toaster";

/**
 * ユーザー登録フォームを表示する.
 *
 * Returns:
 *   JSX.Element:
 *     ユーザー登録フォーム.
 */
export const RegisterForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * ユーザー登録処理を実行する.
   */
  const handleRegister = async (): Promise<void> => {
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("ユーザー名を入力してください.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("メールアドレスを入力してください.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("パスワードを入力してください.");
      return;
    }

    setIsLoading(true);

    try {
      await createUser({
        name,
        email,
        password,
      });

      toaster.create({
        title: "ユーザー登録が完了しました.",
        type: "success",
      });

      navigate("/login");
    } catch {
      setErrorMessage("ユーザー登録に失敗しました.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack gap={4}>
      <Field.Root invalid={Boolean(errorMessage)}>
        <Field.Label>ユーザー名</Field.Label>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="ユーザー名"
        />
      </Field.Root>

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

      <Button
        colorPalette="green"
        loading={isLoading}
        onClick={() => void handleRegister()}
      >
        登録
      </Button>
    </Stack>
  );
};
