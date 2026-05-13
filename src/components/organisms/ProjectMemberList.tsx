import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRoot,
  TableRow,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { deleteProjectMember } from "../../services/projectMemberService";
import type { ProjectMember } from "../../types/projectMember";
import { toaster } from "../ui/toaster";

type Props = {
  projectId: string;
  members: ProjectMember[];
  onDeleted: () => Promise<void>;
};

/**
 * プロジェクトメンバー一覧を表示する.
 *
 * Args:
 *   projectId:
 *     プロジェクトID.
 *   members:
 *     プロジェクトメンバー一覧.
 *   onDeleted:
 *     メンバー削除後に実行する処理.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクトメンバー一覧.
 */
export const ProjectMemberList = ({ projectId, members, onDeleted }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * メンバー削除処理を実行する.
   *
   * Args:
   *   userId:
   *     削除対象ユーザーID.
   */
  const handleDeleteMember = async (userId: string): Promise<void> => {
    setErrorMessage("");

    try {
      await deleteProjectMember(projectId, userId);

      toaster.create({
        title: "メンバーを削除しました.",
        type: "success",
      });

      await onDeleted();
    } catch {
      setErrorMessage("メンバー削除に失敗しました.");
    }
  };

  if (members.length === 0) {
    return <Text color="gray.500">メンバーはいません.</Text>;
  }

  return (
    <>
      {errorMessage && (
        <Text color="red.500" mb={4}>
          {errorMessage}
        </Text>
      )}

      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ユーザー名</Table.ColumnHeader>
            <Table.ColumnHeader>役割</Table.ColumnHeader>
            <Table.ColumnHeader width="80px">役割</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {members.map((member) => (
            <Table.Row key={member.id}>
              <Table.Cell>{member.user_name}</Table.Cell>

              <Table.Cell>{member.role}</Table.Cell>

              <Table.Cell>
                <IconButton
                  aria-label="メンバーを削除"
                  colorPalette="red"
                  size="sm"
                  variant="ghost"
                  onClick={() => void handleDeleteMember(member.user_id)}
                >
                  ×
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
