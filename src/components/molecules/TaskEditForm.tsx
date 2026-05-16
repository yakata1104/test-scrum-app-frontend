import { updateTask } from "@/services/taskService";
import type { Task } from "@/types/task";
import { Field } from "@ark-ui/react";
import { Input, Stack, Textarea } from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useState } from "react";

type Props = {
  task: Task;
  onUpdated: () => Promise<void>;
  onFinished: () => void;
};

/**
 * タスク編集フォームを表示する.
 *
 * Args:
 *   task:
 *     編集対象のタスク.
 *   onUpdated:
 *     タスク更新後に実行する処理.
 *   onFinished:
 *     編集完了後に実行する処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスク編集フォーム.
 */
export const TaskEditForm = forwardRef<TaskEditFormHandle, Props>(
  ({ task, onUpdated, onFinished }, ref) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description ?? "");
    const [dueDate, setDueDate] = useState(
      task.due_date ? task.due_date.slice(0, 16) : "",
    );
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * タスク更新を実行する.
     */
    const handleUpdate = async (): Promise<void> => {
      setErrorMessage("");

      if (!title.trim()) {
        setErrorMessage("タスク名を入力してください.");
        return;
      }

      await updateTask({
        taskId: task.id,
        title,
        description: description.trim() ? description : null,
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
      });

      await onUpdated();
      onFinished();
    };

    useImperativeHandle(ref, () => ({
      submit: handleUpdate,
    }));

    return (
      <Stack gap={4}>
        <Field.Root invalid={Boolean(errorMessage)}>
          <Field.Label>タスク名</Field.Label>

          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
        </Field.Root>

        <Field.Root>
          <Field.Label>説明</Field.Label>

          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
      </Stack>
    );
  },
);

export type TaskEditFormHandle = {
  submit: () => Promise<void>;
};
