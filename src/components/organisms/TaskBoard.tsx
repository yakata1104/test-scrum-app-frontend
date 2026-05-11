import { Grid, Text } from "@chakra-ui/react";

import type { Task } from "../../types/task";
import type { TaskColumn } from "../../types/taskColumn";
import { TaskColumn as TaskColumnView } from "./TaskColumn";

type Props = {
  columns: TaskColumn[];
  tasks: Task[];
  onClickCreateTask: (column: TaskColumn) => void;
};

/**
 * タスクボードを表示する.
 *
 * Args:
 *   columns:
 *     タスクカラム一覧.
 *   tasks:
 *     タスク一覧.
 *   onClickCreateTask:
 *     タスク作成ボタン押下時の処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスクボード.
 */
export const TaskBoard = ({ columns, tasks, onClickCreateTask }: Props) => {
  if (columns.length === 0) {
    return <Text color="gray.500">タスクカラムがありません.</Text>;
  }

  return (
    <Grid
      gap={4}
      templateColumns={{
        base: "1fr",
        md: `repeat(${columns.length}, minmax(0, 1fr))`,
      }}
    >
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.column_id === column.id,
        );

        return (
          <TaskColumnView
            key={column.id}
            column={column}
            tasks={columnTasks}
            onClickCreateTask={onClickCreateTask}
          />
        );
      })}
    </Grid>
  );
};
