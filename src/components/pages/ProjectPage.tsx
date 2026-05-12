import {
  Box,
  Button,
  Dialog,
  Heading,
  Portal,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TaskCreateForm } from "../molecules/TaskCreateForm";
import { TaskBoard } from "../organisms/TaskBoard";
import type { Task } from "../../types/task";
import type { TaskColumn } from "../../types/taskColumn";
import {
  fetchTaskColumns,
  fetchTasks,
  moveTaskColumn,
} from "../../services/taskService";
import { TaskDetailDrawer } from "../organisms/TaskDetailDrawer";

/**
 * プロジェクト画面を表示する.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクト画面.
 */
export const ProjectPage = () => {
  const { projectId } = useParams();

  const [columns, setColumns] = useState<TaskColumn[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<TaskColumn | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailDrawerOpen, setIsTaskDetailDrawerOpen] = useState(false);

  /**
   * タスクボード表示に必要なデータを再読み込みする.
   */
  const reloadTaskBoard = async (): Promise<void> => {
    if (!projectId) {
      setErrorMessage("プロジェクトIDが取得できません.");
      return;
    }

    try {
      const [fetchedColumns, fetchedTasks] = await Promise.all([
        fetchTaskColumns(projectId),
        fetchTasks(projectId),
      ]);

      setColumns(fetchedColumns);
      setTasks(fetchedTasks);
      setErrorMessage("");
    } catch {
      setErrorMessage("タスクボードの取得に失敗しました.");
    }
  };

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
      setErrorMessage("タスクの移動に失敗しました.");
    }
  };

  useEffect(() => {
    let isMounted = true;

    /**
     * タスクボード表示に必要なデータを読み込む.
     */
    const loadTaskBoard = async (): Promise<void> => {
      if (!projectId) {
        setErrorMessage("プロジェクトIDが取得できません.");
        setIsLoading(false);
        return;
      }

      try {
        const [fetchedColumns, fetchedTasks] = await Promise.all([
          fetchTaskColumns(projectId),
          fetchTasks(projectId),
        ]);

        if (isMounted) {
          setColumns(fetchedColumns);
          setTasks(fetchedTasks);
        }
      } catch {
        if (isMounted) {
          setErrorMessage("タスクボードの取得に失敗しました.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadTaskBoard();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

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
        onClickTask={(task) => {
          setSelectedTask(task);
          setIsTaskDetailDrawerOpen(true);
        }}
      />

      <Dialog.Root
        open={isCreateDialogOpen}
        onOpenChange={(event) => setIsCreateDialogOpen(event.open)}
      >
        <TaskDetailDrawer
          task={selectedTask}
          open={isTaskDetailDrawerOpen}
          onClose={() => {
            setIsTaskDetailDrawerOpen(false);
            setSelectedTask(null);
          }}
        />
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
                  onCreated={reloadTaskBoard}
                  onClose={() => {
                    setIsCreateDialogOpen(false);
                    setSelectedColumn(null);
                  }}
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
    </Box>
  );
};
