import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";

import type { Task } from "../../types/task";
import type { TaskColumn as TaskColumnType } from "../../types/taskColumn";
import { TaskCard } from "./TaskCard";

type Props = {
  column: TaskColumnType;
  columns: TaskColumnType[];
  tasks: Task[];
  onClickCreateTask: (column: TaskColumnType) => void;
  onMoveTask: (taskId: string, columnId: string) => Promise<void>;
  onClickTask: (task: Task) => void;
};

/**
 * タスクカラムを表示する.
 *
 * Args:
 *   column:
 *     表示対象のタスクカラム.
 *   columns:
 *     移動先候補を含むタスクカラム一覧.
 *   tasks:
 *     カラム内に表示するタスク一覧.
 *   onClickCreateTask:
 *     タスク作成ボタン押下時の処理.
 *   onMoveTask:
 *     タスク移動時に実行する処理.
 *   onClickTask:
 *     タスクカード押下時に実行する処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスクカラム.
 */
export const TaskColumn = ({
  column,
  columns,
  tasks,
  onClickCreateTask,
  onMoveTask,
  onClickTask,
}: Props) => {
  return (
    <Box bg="gray.50" borderRadius="lg" minW="280px" p={4}>
      <Heading size="sm" mb={3}>
        {column.name}
      </Heading>

      <Button
        borderRadius="full"
        colorPalette="green"
        mb={4}
        size="sm"
        variant="outline"
        onClick={() => onClickCreateTask(column)}
      >
        +
      </Button>

      {tasks.length === 0 ? (
        <Text color="gray.500" fontSize="sm">
          タスクがありません.
        </Text>
      ) : (
        <Stack gap={3}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columns={columns}
              onMoveTask={onMoveTask}
              onClickTask={onClickTask}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};
