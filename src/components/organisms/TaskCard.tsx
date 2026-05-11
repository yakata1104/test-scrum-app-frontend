import { Button, Card, Stack, Text } from "@chakra-ui/react";

import type { Task } from "../../types/task";
import type { TaskColumn } from "../../types/taskColumn";

type Props = {
  task: Task;
  columns: TaskColumn[];
  onMoveTask: (taskId: string, columnId: string) => Promise<void>;
};

/**
 * タスクカードを表示する.
 *
 * Args:
 *   task:
 *     表示対象のタスク.
 *   columns:
 *     移動先候補のタスクカラム一覧.
 *   onMoveTask:
 *     タスク移動時に実行する処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスクカード.
 */
export const TaskCard = ({ task, columns, onMoveTask }: Props) => {
  const movableColumns = columns.filter(
    (column) => column.id !== task.column_id,
  );

  return (
    <Card.Root>
      <Card.Body>
        <Text fontWeight="bold">{task.title}</Text>

        {task.description && (
          <Text mt={2} color="gray.600" fontSize="sm">
            {task.description}
          </Text>
        )}

        <Stack direction="row" gap={2} mt={4} flexWrap="wrap">
          {movableColumns.map((column) => (
            <Button
              key={column.id}
              size="xs"
              variant="outline"
              colorPalette="green"
              onClick={() => void onMoveTask(task.id, column.id)}
            >
              {column.name}へ移動
            </Button>
          ))}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
