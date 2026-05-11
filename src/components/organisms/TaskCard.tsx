import { Card, Text } from "@chakra-ui/react";

import type { Task } from "../../types/task";

type Props = {
  task: Task;
};

/**
 * タスクカードを表示する.
 *
 * Args:
 *   task:
 *     表示対象のタスク.
 *
 * Returns:
 *   JSX.Element:
 *     タスクカード.
 */
export const TaskCard = ({ task }: Props) => {
  return (
    <Card.Root>
      <Card.Body>
        <Text fontWeight="bold">{task.title}</Text>

        {task.description && (
          <Text mt={2} color="gray.600" fontSize="sm">
            {task.description}
          </Text>
        )}
      </Card.Body>
    </Card.Root>
  );
};
