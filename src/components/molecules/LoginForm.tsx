import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      <Button colorPalette="blue">ログイン</Button>
    </Stack>
  );
};
