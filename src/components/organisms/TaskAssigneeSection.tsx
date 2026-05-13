import { Button, Field, NativeSelect, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

import { addTaskAssignee } from "../../services/taskAssigneeService";
import type { ProjectMember } from "../../types/projectMember";
import type { TaskAssignee } from "../../types/taskAssignee";
import { toaster } from "../ui/toaster";

type Props = {
  taskId: string;
  assignees: TaskAssignee[];
  projectMembers: ProjectMember[];
  onReloadAssignees: () => Promise<void>;
};

/**
 * タスク担当者セクションを表示する.
 *
 * Args:
 *   taskId:
 *     タスクID.
 *   assignees:
 *     タスク担当者一覧.
 *   projectMembers:
 *     プロジェクトメンバー一覧.
 *   onReloadAssignees:
 *     担当者一覧を再読み込みする処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスク担当者セクション.
 */
export const TaskAssigneeSection = ({
  taskId,
  assignees,
  projectMembers,
  onReloadAssignees,
}: Props) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const assigneeUserIds = assignees.map((assignee) => assignee.user_id);

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
      await onReloadAssignees();

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

  return (
    <Stack gap={4} pt={6}>
      <Text fontWeight="bold">担当者</Text>

      {assignees.length === 0 ? (
        <Text color="gray.500" fontSize="sm">
          担当者はいません.
        </Text>
      ) : (
        <Stack gap={1}>
          {assignees.map((assignee) => (
            <Text key={assignee.id} fontSize="sm">
              {assignee.user_id}
            </Text>
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
                  {member.user_id} / {member.role}
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
