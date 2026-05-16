import type { TaskColumn } from "@/types/taskColumn";
import { Button, Dialog, Portal } from "@chakra-ui/react";
import { TaskCreateForm } from "../molecules/TaskCreateForm";

type Props = {
  open: boolean;
  projectId: string;
  selectedColumn: TaskColumn | null;
  onCreated: () => Promise<void>;
  onClose: () => void;
};

/**
 * タスク作成Dialogを表示する.
 *
 * Args:
 *   open:
 *     Dialogの表示状態.
 *   projectId:
 *     プロジェクトID.
 *   selectedColumn:
 *     タスク作成ボタンを押下したカラム.
 *   onCreated:
 *     タスク作成後に実行する処理.
 *   onClose:
 *     Dialogを閉じる処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスク作成Dialog.
 */
export const TaskCreateDialog = ({
  open,
  projectId,
  selectedColumn,
  onCreated,
  onClose,
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
              <Dialog.Title>
                タスク作成
                {selectedColumn ? ` - ${selectedColumn.name}` : ""}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <TaskCreateForm
                projectId={projectId}
                onCreated={onCreated}
                onClose={onClose}
              />
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">キャンセル</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
