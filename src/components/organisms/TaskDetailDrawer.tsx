import { Drawer, Portal, Stack, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

import { deleteTask } from "../../services/taskService";
import type { Task } from "../../types/task";
import { TaskDeleteConfirmDialog } from "../molecules/TaskDeleteConfirmDialog";
import { TaskAssigneeSection } from "./TaskAssigneeSection";
import { TaskCommentsSection } from "./TaskCommentsSection";
import {
  TaskEditForm,
  type TaskEditFormHandle,
} from "../molecules/TaskEditForm";
import { TaskDetailView } from "../molecules/TaskDetailView";
import { TaskDetailDrawerHeaderActions } from "../molecules/TaskDetailDrawerHeaderActions";
import { TaskDetailDrawerFooterActions } from "../molecules/TaskDetailDrawerFooterActions";
import { toaster } from "../ui/toaster";

type Props = {
  task: Task | null;
  projectId: string;
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
  projectId,
  open,
  onClose,
  onUpdated,
  onDeleted,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const taskEditFormRef = useRef<TaskEditFormHandle>(null);

  /**
   * 編集モードを開始する.
   */
  const handleStartEdit = (): void => {
    setIsEditing(true);
  };

  /**
   * Drawerを閉じる.
   */
  const handleClose = (): void => {
    setIsEditing(false);
    onClose();
  };

  /**
   * タスク更新を実行する.
   */
  const handleUpdate = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await taskEditFormRef.current?.submit();
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
    setIsDeleting(true);

    try {
      await deleteTask(task.id);

      await onDeleted();

      toaster.create({
        title: "タスクを削除しました.",
        type: "success",
      });

      setIsDeleteConfirmOpen(false);

      handleClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
                  <TaskDetailDrawerHeaderActions
                    isDeleting={isDeleting}
                    onClickEdit={handleStartEdit}
                    onClickDelete={() => setIsDeleteConfirmOpen(true)}
                  />
                )}
              </Drawer.Header>

              <Drawer.Body>
                {task ? (
                  <Stack gap={6}>
                    {isEditing ? (
                      <TaskEditForm
                        ref={taskEditFormRef}
                        task={task}
                        onUpdated={onUpdated}
                        onFinished={() => setIsEditing(false)}
                      />
                    ) : (
                      <TaskDetailView task={task} />
                    )}

                    <TaskAssigneeSection
                      taskId={task.id}
                      projectId={projectId}
                    />
                    <TaskCommentsSection taskId={task.id} />
                  </Stack>
                ) : (
                  <Text color="gray.500">タスクが選択されていません.</Text>
                )}
              </Drawer.Body>

              <Drawer.Footer>
                <TaskDetailDrawerFooterActions
                  isEditing={isEditing}
                  isLoading={isLoading}
                  onClickClose={handleClose}
                  onClickCancel={() => setIsEditing(false)}
                  onClickSubmit={() => void handleUpdate()}
                />
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      <TaskDeleteConfirmDialog
        open={isDeleteConfirmOpen}
        loading={isDeleting}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => void handleDelete()}
      />
    </>
  );
};
