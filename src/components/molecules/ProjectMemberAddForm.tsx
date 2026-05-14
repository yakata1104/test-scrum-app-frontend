import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";

import { addProjectMember } from "../../services/projectMemberService";
import { toaster } from "../ui/toaster";

type Props = {
  projectId: string;
  onAdded: () => Promise<void>;
};

/**
 * プロジェクトメンバー追加フォームを表示する.
 *
 * Args:
 *   projectId:
 *     プロジェクトID.
 *   onAdded:
 *     メンバー追加後に実行する処理.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクトメンバー追加フォーム.
 */
export const ProjectMemberAddForm = ({ projectId, onAdded }: Props) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * メンバー追加処理を実行する.
   */
  const handleAddMember = async (): Promise<void> => {
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("メールアドレスを入力してください.");
      return;
    }

    setIsLoading(true);

    try {
      await addProjectMember({
        projectId,
        email,
      });

      toaster.create({
        title: "メンバーを追加しました.",
        type: "success",
      });

      setEmail("");
      await onAdded();
    } catch {
      setErrorMessage("メンバー追加に失敗しました.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack gap={3}>
      <Field.Root invalid={Boolean(errorMessage)}>
        <Field.Label>メールアドレス</Field.Label>

        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="user@example.com"
        />

        {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
      </Field.Root>

      <Button
        alignSelf="flex-end"
        colorPalette="green"
        loading={isLoading}
        onClick={() => void handleAddMember()}
      >
        追加
      </Button>
    </Stack>
  );
};
