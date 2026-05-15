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
import { toaster } from "@/components/ui/toaster";

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
import { fetchTaskComments } from "../../services/taskCommentService";
import type { TaskComment } from "../../types/taskComment";
import { fetchProjectMembers } from "../../services/projectMemberService";
import { fetchTaskAssignees } from "../../services/taskAssigneeService";
import type { ProjectMember } from "../../types/projectMember";
import type { TaskAssignee } from "../../types/taskAssignee";
import { useTaskBoard } from "../../hooks/useTaskBoard";

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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailDrawerOpen, setIsTaskDetailDrawerOpen] = useState(false);
  const [taskComments, setTaskComments] = useState<TaskComment[]>([]);
  const [taskAssignees, setTaskAssignees] = useState<TaskAssignee[]>([]);
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);
  const { columns, tasks, isLoading, errorMessage, reloadTaskBoard } =
    useTaskBoard(projectId);

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

  /**
   * タスク詳細Drawerを開く.
   *
   * Args:
   *   task:
   *     表示対象のタスク.
   */
  const openTaskDetailDrawer = async (task: Task): Promise<void> => {
    if (!projectId) {
      return;
    }

    setSelectedTask(task);
    setTaskComments([]);
    setTaskAssignees([]);
    setProjectMembers([]);
    setIsTaskDetailDrawerOpen(true);

    await Promise.all([
      loadTaskComments(task.id),
      loadTaskAssignees(task.id),
      loadProjectMembers(projectId),
    ]);
  };

  /**
   * 選択中タスクのコメント一覧を読み込む.
   *
   * Args:
   *   taskId:
   *     タスクID.
   */
  const loadTaskComments = async (taskId: string): Promise<void> => {
    try {
      const fetchedComments = await fetchTaskComments(taskId);
      setTaskComments(fetchedComments);
    } catch {
      setTaskComments([]);
    }
  };

  /**
   * 選択中タスクの担当者一覧を読み込む.
   *
   * Args:
   *   taskId:
   *     タスクID.
   */
  const loadTaskAssignees = async (taskId: string): Promise<void> => {
    try {
      const fetchedAssignees = await fetchTaskAssignees(taskId);
      setTaskAssignees(fetchedAssignees);
    } catch {
      setTaskAssignees([]);
    }
  };

  /**
   * プロジェクトメンバー一覧を読み込む.
   *
   * Args:
   *   targetProjectId:
   *     プロジェクトID.
   */
  const loadProjectMembers = async (targetProjectId: string): Promise<void> => {
    try {
      const fetchedProjectMembers = await fetchProjectMembers(targetProjectId);
      setProjectMembers(fetchedProjectMembers);
    } catch {
      setProjectMembers([]);
    }
  };

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
          void openTaskDetailDrawer(task);
        }}
      />

      <Dialog.Root
        open={isCreateDialogOpen}
        onOpenChange={(event) => setIsCreateDialogOpen(event.open)}
      >
        <TaskDetailDrawer
          task={selectedTask}
          comments={taskComments}
          assignees={taskAssignees}
          projectMembers={projectMembers}
          open={isTaskDetailDrawerOpen}
          onUpdated={async () => {
            await reloadTaskBoard();
          }}
          onDeleted={handleTaskDeleted}
          onReloadComments={async () => {
            if (selectedTask) {
              await loadTaskComments(selectedTask.id);
            }
          }}
          onReloadAssignees={async () => {
            if (selectedTask) {
              await loadTaskAssignees(selectedTask.id);
            }
          }}
          onClose={() => {
            setIsTaskDetailDrawerOpen(false);
            setSelectedTask(null);
            setTaskComments([]);
            setTaskAssignees([]);
            setProjectMembers([]);
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
                  onCreated={async () => {
                    await reloadTaskBoard();
                  }}
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
