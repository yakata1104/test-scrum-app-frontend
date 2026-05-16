import { Button, IconButton, Menu, Portal, Stack } from "@chakra-ui/react";

type Props = {
  onClickEdit: () => void;
  onClickDelete: () => void;
  isDeleting: boolean;
};

/**
 * タスク詳細Drawerヘッダー操作を表示する.
 *
 * Args:
 *   onClickEdit:
 *     編集ボタン押下時に実行する処理.
 *   onClickDelete:
 *     削除メニュー押下時に実行する処理.
 *   isDeleting:
 *     削除処理中かどうか.
 *
 * Returns:
 *   JSX.Element:
 *     タスク詳細Drawerヘッダー操作.
 */
export const TaskDetailDrawerHeaderActions = ({
  onClickEdit,
  onClickDelete,
  isDeleting,
}: Props) => {
  return (
    <Stack direction="row" gap={2}>
      <Button
        colorPalette="green"
        size="sm"
        variant="outline"
        onClick={onClickEdit}
      >
        編集
      </Button>

      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton aria-label="タスク操作メニュー" size="sm" variant="ghost">
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
                onClick={onClickDelete}
              >
                削除
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Stack>
  );
};
