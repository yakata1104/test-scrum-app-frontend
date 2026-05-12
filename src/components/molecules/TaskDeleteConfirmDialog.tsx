import { Button, Dialog, Portal } from "@chakra-ui/react";

type Props = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

/**
 * タスク削除確認Dialogを表示する.
 *
 * Args:
 *   open:
 *     Dialogの表示状態.
 *   loading:
 *     削除処理中かどうか.
 *   onClose:
 *     Dialogを閉じる処理.
 *   onConfirm:
 *     削除確定時に実行する処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスク削除確認Dialog.
 */
export const TaskDeleteConfirmDialog = ({
  open,
  loading,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(event) => {
        if (!event.open) {
          onClose();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>タスクを削除しますか?</Dialog.Title>
            </Dialog.Header>

            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>
                キャンセル
              </Button>

              <Button colorPalette="red" loading={loading} onClick={onConfirm}>
                削除
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
