import { Button, Field, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";

import { createTaskComment } from "../../services/taskCommentService";

type Props = {
  taskId: string;
  onCreated: () => Promise<void>;
};

/**
 * タスクコメント投稿フォームを表示する.
 *
 * Args:
 *   taskId:
 *     タスクID.
 *   onCreated:
 *     コメント作成後に実行する処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスクコメント投稿フォーム.
 */
export const TaskCommentForm = ({ taskId, onCreated }: Props) => {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * コメント投稿処理を実行する.
   */
  const handleCreate = async (): Promise<void> => {
    setErrorMessage("");

    if (!content.trim()) {
      setErrorMessage("コメントを入力してください.");
      return;
    }

    setIsLoading(true);

    try {
      await createTaskComment({
        taskId,
        content,
      });

      setContent("");
      await onCreated();
    } catch {
      setErrorMessage("コメント投稿に失敗しました.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack gap={3}>
      <Field.Root invalid={Boolean(errorMessage)}>
        <Field.Label>コメント</Field.Label>
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="コメントを入力"
        />
        {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
      </Field.Root>

      <Button
        alignSelf="flex-end"
        colorPalette="green"
        loading={isLoading}
        onClick={() => void handleCreate()}
      >
        投稿
      </Button>
    </Stack>
  );
};
