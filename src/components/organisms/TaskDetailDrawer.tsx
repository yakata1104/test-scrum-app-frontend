import { Button, Drawer, Portal, Stack, Text } from "@chakra-ui/react";

import type { Task } from "../../types/task";

type Props = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
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
 *
 * Returns:
 *   JSX.Element:
 *     タスク詳細Drawer.
 */
export const TaskDetailDrawer = ({ task, open, onClose }: Props) => {
  return (
    <Drawer.Root open={open} onOpenChange={(event) => !event.open && onClose()}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>タスク詳細</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              {task ? (
                <Stack gap={4}>
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
                </Stack>
              ) : (
                <Text color="gray.500">タスクが選択されていません.</Text>
              )}
            </Drawer.Body>

            <Drawer.Footer>
              <Button variant="outline" onClick={onClose}>
                閉じる
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
