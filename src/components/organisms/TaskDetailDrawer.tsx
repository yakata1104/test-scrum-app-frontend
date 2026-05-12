import {
  Button,
  Drawer,
  Field,
  IconButton,
  Input,
  Menu,
  Portal,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

import { deleteTask, updateTask } from "../../services/taskService";
import type { Task } from "../../types/task";

type Props = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => Promise<void>;
  onDeleted: () => Promise<void>;
};
/**
 * タスク詳細Drawerを表示する.
 *
 * Args:
 *   task:
 *     表示対象のタスク.
 *   open:
 *     Drawerの表示状態.
 *   onClose:
 *     Drawerを閉じる処理.
 *   onUpdated:
 *     タスク更新後に実行する処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスク詳細Drawer.
 */
export const TaskDetailDrawer = ({
  task,
  open,
  onClose,
  onUpdated,
  onDeleted,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * 編集モードを開始する.
   */
  const handleStartEdit = (): void => {
    if (!task) {
      return;
    }

    setTitle(task.title);
    setDescription(task.description ?? "");
    setDueDate(task.due_date ? task.due_date.slice(0, 16) : "");
    setErrorMessage("");
    setIsEditing(true);
  };

  /**
   * Drawerを閉じる.
   */
  const handleClose = (): void => {
    setIsEditing(false);
    setErrorMessage("");
    onClose();
  };

  /**
   * タスク更新を実行する.
   */
  const handleUpdate = async (): Promise<void> => {
    if (!task) {
      return;
    }

    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("タスク名を入力してください.");
      return;
    }

    setIsLoading(true);

    try {
      await updateTask({
        taskId: task.id,
        title,
        description: description.trim() ? description : null,
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
      });

      await onUpdated();
      setIsEditing(false);
    } catch {
      setErrorMessage("タスク更新に失敗しました.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * タスク削除を実行する.
   */
  const handleDelete = async (): Promise<void> => {
    if (!task) {
      return;
    }

    setErrorMessage("");
    setIsDeleting(true);

    try {
      await deleteTask(task.id);
      await onDeleted();
      handleClose();
    } catch {
      setErrorMessage("タスク削除に失敗しました.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(event) => !event.open && handleClose()}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>タスク詳細</Drawer.Title>

              {!isEditing && task && (
                <Stack direction="row" gap={2}>
                  <Button
                    colorPalette="green"
                    size="sm"
                    variant="outline"
                    onClick={handleStartEdit}
                  >
                    編集
                  </Button>

                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <IconButton
                        aria-label="タスク操作メニュー"
                        size="sm"
                        variant="ghost"
                      >
                        …
                      </IconButton>
                    </Menu.Trigger>

                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item
                            value="delete"
                            color="red.500"
                            disabled={isDeleting}
                            onClick={() => void handleDelete()}
                          >
                            削除
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </Stack>
              )}
            </Drawer.Header>

            <Drawer.Body>
              {task ? (
                <Stack gap={4}>
                  {isEditing ? (
                    <>
                      <Field.Root invalid={Boolean(errorMessage)}>
                        <Field.Label>タスク名</Field.Label>
                        <Input
                          value={title}
                          onChange={(event) => setTitle(event.target.value)}
                        />
                        {errorMessage && (
                          <Field.ErrorText>{errorMessage}</Field.ErrorText>
                        )}
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>説明</Field.Label>
                        <Textarea
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
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
                    </>
                  ) : (
                    <>
                      <Stack gap={1}>
                        <Text fontWeight="bold">タスク名</Text>
                        <Text>{task.title}</Text>
                      </Stack>

                      <Stack gap={1}>
                        <Text fontWeight="bold">説明</Text>
                        <Text color="gray.600">
                          {task.description || "説明はありません."}
                        </Text>
                      </Stack>

                      <Stack gap={1}>
                        <Text fontWeight="bold">期限</Text>
                        <Text color="gray.600">
                          {task.due_date
                            ? new Date(task.due_date).toLocaleString()
                            : "期限はありません."}
                        </Text>
                      </Stack>
                    </>
                  )}
                </Stack>
              ) : (
                <Text color="gray.500">タスクが選択されていません.</Text>
              )}
            </Drawer.Body>

            <Drawer.Footer>
              {isEditing ? (
                <Stack direction="row" gap={2}>
                  <Button
                    colorPalette="green"
                    loading={isLoading}
                    onClick={() => void handleUpdate()}
                  >
                    決定
                  </Button>

                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    キャンセル
                  </Button>
                </Stack>
              ) : (
                <Button variant="outline" onClick={handleClose}>
                  閉じる
                </Button>
              )}
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
