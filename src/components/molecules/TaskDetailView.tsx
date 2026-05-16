import type { Task } from "@/types/task";
import { Stack, Text } from "@chakra-ui/react";

type Props = {
  task: Task;
};

/**
 * タスク詳細情報を表示する.
 *
 * Args:
 *   task:
 *     表示対象のタスク.
 *
 * Returns:
 *   JSX.Element:
 *     タスク詳細表示.
 */
export const TaskDetailView = ({ task }: Props) => {
  return (
    <>
      <Stack gap={1}>
        <Text fontWeight="bold">タスク名</Text>
        <Text>{task.title}</Text>
      </Stack>
      <Stack gap={1}>
        <Text fontWeight="bold">タスクID</Text>

        <Text fontSize="xs" color="gray.500">
          {task.id}
        </Text>
      </Stack>
      <Stack gap={1}>
        <Text fontWeight="bold">説明</Text>

        <Text color="gray.600">{task.description || "説明はありません."}</Text>
      </Stack>

      <Stack gap={1}>
        <Text fontWeight="bold">期限</Text>

        <Text color="gray.600">
          {task.due_date
            ? new Date(task.due_date).toLocaleString()
            : "期限はありません."}
        </Text>
      </Stack>
    </>
  );
};
