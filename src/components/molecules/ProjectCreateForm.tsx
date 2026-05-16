import { Button, Field, Input, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";

import { createProject } from "../../services/projectService";

type Props = {
  onCreated: () => Promise<void>;
  onClose: () => void;
};

/**
 * プロジェクト作成フォームを表示する.
 *
 * Args:
 *   onCreated:
 *     プロジェクト作成後に実行する処理.
 *   onClose:
 *     フォームを閉じる処理.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクト作成フォーム.
 */
export const ProjectCreateForm = ({ onCreated, onClose }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * プロジェクト作成処理を実行する.
   */
  const handleCreate = async (): Promise<void> => {
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("プロジェクト名を入力してください.");
      return;
    }

    setIsLoading(true);

    try {
      await createProject({
        name,
        description: description.trim() ? description : null,
      });

      setName("");
      setDescription("");
      await onCreated();
      onClose();
    } catch {
      setErrorMessage("プロジェクト作成に失敗しました.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack gap={4}>
      <Field.Root invalid={Boolean(errorMessage)}>
        <Field.Label>プロジェクト名</Field.Label>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="プロジェクト名"
        />
        {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
      </Field.Root>

      <Field.Root>
        <Field.Label>説明</Field.Label>
        <Textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="説明"
        />
      </Field.Root>

      <Button colorPalette="green" loading={isLoading} onClick={handleCreate}>
        作成
      </Button>
    </Stack>
  );
};
