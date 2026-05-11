import { Box, Heading, Stack, Text } from "@chakra-ui/react";

import type { Task } from "../../types/task";
import type { TaskColumn as TaskColumnType } from "../../types/taskColumn";
import { TaskCard } from "./TaskCard";

type Props = {
  column: TaskColumnType;
  tasks: Task[];
};

/**
 * タスクカラムを表示する.
 *
 * Args:
 *   column:
 *     表示対象のタスクカラム.
 *   tasks:
 *     カラム内に表示するタスク一覧.
 *
 * Returns:
 *   JSX.Element:
 *     タスクカラム.
 */
export const TaskColumn = ({ column, tasks }: Props) => {
  return (
    <Box bg="gray.50" borderRadius="lg" minW="280px" p={4}>
      <Heading size="sm" mb={4}>
        {column.name}
      </Heading>

      {tasks.length === 0 ? (
        <Text color="gray.500" fontSize="sm">
          タスクがありません.
        </Text>
      ) : (
        <Stack gap={3}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Stack>
      )}
    </Box>
  );
};
