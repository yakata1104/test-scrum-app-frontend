import {
  Box,
  Button,
  Field,
  IconButton,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { useTaskAssignees } from "../../hooks/useTaskAssignees";
import {
  addTaskAssignee,
  deleteTaskAssignee,
} from "../../services/taskAssigneeService";
import type { ProjectMember } from "../../types/projectMember";
import { toaster } from "../ui/toaster";

type Props = {
  taskId: string;
  projectMembers: ProjectMember[];
};

/**
 * タスク担当者セクションを表示する.
 *
 * Args:
 *   taskId:
 *     タスクID.
 *   projectMembers:
 *     プロジェクトメンバー一覧.
 *
 * Returns:
 *   JSX.Element:
 *     タスク担当者セクション.
 */
export const TaskAssigneeSection = ({ taskId, projectMembers }: Props) => {
  const { taskAssignees, reloadTaskAssignees } = useTaskAssignees(taskId);

  const [selectedUserId, setSelectedUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const assigneeUserIds = taskAssignees.map((assignee) => assignee.user_id);

  const selectableMembers = projectMembers.filter(
    (member) => !assigneeUserIds.includes(member.user_id),
  );

  /**
   * タスク担当者追加処理を実行する.
   */
  const handleAddAssignee = async (): Promise<void> => {
    setErrorMessage("");

    if (!selectedUserId) {
      setErrorMessage("担当者を選択してください.");
      return;
    }

    setIsLoading(true);

    try {
      await addTaskAssignee({
        taskId,
        userId: selectedUserId,
      });

      setSelectedUserId("");
      await reloadTaskAssignees();

      toaster.create({
        title: "担当者を追加しました.",
        type: "success",
      });
    } catch {
      setErrorMessage("担当者の追加に失敗しました.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * タスク担当者削除処理を実行する.
   *
   * Args:
   *   userId:
   *     削除対象のユーザーID.
   */
  const handleDeleteAssignee = async (userId: string): Promise<void> => {
    setErrorMessage("");

    try {
      await deleteTaskAssignee(taskId, userId);
      await reloadTaskAssignees();

      toaster.create({
        title: "担当者を削除しました.",
        type: "success",
      });
    } catch {
      setErrorMessage("担当者の削除に失敗しました.");
    }
  };

  return (
    <Stack gap={4} pt={6}>
      <Text fontWeight="bold">担当者</Text>

      {taskAssignees.length === 0 ? (
        <Text color="gray.500" fontSize="sm">
          担当者はいません.
        </Text>
      ) : (
        <Stack gap={2}>
          {taskAssignees.map((assignee) => (
            <Box
              key={assignee.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              <Text fontSize="sm">{assignee.user_name}</Text>

              <IconButton
                aria-label="担当者を削除"
                colorPalette="red"
                size="xs"
                variant="ghost"
                onClick={() => void handleDeleteAssignee(assignee.user_id)}
              >
                ×
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}

      <Stack gap={3}>
        <Field.Root invalid={Boolean(errorMessage)}>
          <Field.Label>担当者を追加</Field.Label>

          <NativeSelect.Root>
            <NativeSelect.Field
              value={selectedUserId}
              onChange={(event) => setSelectedUserId(event.target.value)}
            >
              <option value="">選択してください</option>

              {selectableMembers.map((member) => (
                <option key={member.id} value={member.user_id}>
                  {member.user_name} / {member.role}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>

          {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
        </Field.Root>

        <Button
          alignSelf="flex-end"
          colorPalette="green"
          loading={isLoading}
          onClick={() => void handleAddAssignee()}
        >
          追加
        </Button>
      </Stack>
    </Stack>
  );
};
