import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TaskBoard } from "../organisms/TaskBoard";
import { fetchTaskColumns, fetchTasks } from "../../services/taskService";
import type { Task } from "../../types/task";
import type { TaskColumn } from "../../types/taskColumn";

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

  return (
    <Box>
      <Heading mb={6}>タスクボード</Heading>
      <TaskBoard columns={columns} tasks={tasks} />
    </Box>
  );
};
