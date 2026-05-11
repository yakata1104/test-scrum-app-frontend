import { Button, Field, Input, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";

import { createTask } from "../../services/taskService";

type Props = {
  projectId: string;
  onCreated: () => Promise<void>;
  onClose: () => void;
};

/**
 * タスク作成フォームを表示する.
 *
 * Args:
 *   projectId:
 *     プロジェクトID.
 *   onCreated:
 *     タスク作成後に実行する処理.
 *   onClose:
 *     フォームを閉じる処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスク作成フォーム.
 */
export const TaskCreateForm = ({ projectId, onCreated, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * タスク作成処理を実行する.
   */
  const handleCreate = async (): Promise<void> => {
    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("タスク名を入力してください.");
      return;
    }

    setIsLoading(true);

    try {
      await createTask({
        projectId,
        title,
        description: description.trim() ? description : null,
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
      });

      setTitle("");
      setDescription("");
      setDueDate("");
      await onCreated();
      onClose();
    } catch {
      setErrorMessage("タスク作成に失敗しました.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack gap={4}>
      <Field.Root invalid={Boolean(errorMessage)}>
        <Field.Label>タスク名</Field.Label>
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="タスク名"
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

      <Field.Root>
        <Field.Label>期限</Field.Label>
        <Input
          type="datetime-local"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </Field.Root>

      <Button colorPalette="green" loading={isLoading} onClick={handleCreate}>
        作成
      </Button>
    </Stack>
  );
};
