import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";

import { TaskBoard } from "../organisms/TaskBoard";
import type { TaskColumn } from "../../types/taskColumn";
import { moveTaskColumn } from "../../services/taskService";
import { TaskDetailDrawer } from "../organisms/TaskDetailDrawer";
import { useTaskBoard } from "../../hooks/useTaskBoard";
import { TaskCreateDialog } from "../organisms/TaskCreateDialog";
import { useTaskDetailDrawer } from "@/hooks/useTaskDetailDrawer";

/**
 * プロジェクト画面を表示する.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクト画面.
 */
export const ProjectBoardPage = () => {
  const { projectId } = useParams();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<TaskColumn | null>(null);
  const { columns, tasks, isLoading, errorMessage, reloadTaskBoard } =
    useTaskBoard(projectId);
  const {
    selectedTask,
    isOpen: isTaskDetailDrawerOpen,
    open: openTaskDetailDrawer,
    close: closeTaskDetailDrawer,
  } = useTaskDetailDrawer();

  /**
   * タスクを別カラムへ移動する.
   *
   * Args:
   *   taskId:
   *     移動対象のタスクID.
   *   columnId:
   *     移動先のタスクカラムID.
   */
  const handleMoveTask = async (
    taskId: string,
    columnId: string,
  ): Promise<void> => {
    try {
      await moveTaskColumn({
        taskId,
        columnId,
      });

      await reloadTaskBoard();
    } catch {
      toaster.create({
        title: "タスクの移動に失敗しました.",
        type: "error",
      });
    }
  };

  /**
   * タスク削除後の処理を実行する.
   */
  const handleTaskDeleted = async (): Promise<void> => {
    await reloadTaskBoard();

    toaster.create({
      title: "タスクを削除しました.",
      type: "success",
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <Text color="red.500">{errorMessage}</Text>;
  }

  if (!projectId) {
    return <Text color="red.500">プロジェクトIDが取得できません.</Text>;
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={6}
      >
        <Heading>タスクボード</Heading>
      </Box>
      <TaskBoard
        columns={columns}
        tasks={tasks}
        onClickCreateTask={(column) => {
          setSelectedColumn(column);
          setIsCreateDialogOpen(true);
        }}
        onMoveTask={handleMoveTask}
        onClickTask={openTaskDetailDrawer}
      />

      <TaskDetailDrawer
        task={selectedTask}
        projectId={projectId}
        open={isTaskDetailDrawerOpen}
        onUpdated={async () => {
          await reloadTaskBoard();
        }}
        onDeleted={handleTaskDeleted}
        onClose={closeTaskDetailDrawer}
      />
      <TaskCreateDialog
        open={isCreateDialogOpen}
        projectId={projectId}
        selectedColumn={selectedColumn}
        onCreated={async () => {
          await reloadTaskBoard();
        }}
        onClose={() => {
          setIsCreateDialogOpen(false);
          setSelectedColumn(null);
        }}
      />
    </Box>
  );
};
