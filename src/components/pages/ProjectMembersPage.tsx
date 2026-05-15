import { Heading, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { ProjectMemberAddForm } from "../molecules/ProjectMemberAddForm";
import { ProjectMemberList } from "../organisms/ProjectMemberList";
import { useProjectMembers } from "@/hooks/useProjectMembers";

/**
 * プロジェクトメンバー管理画面を表示する.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクトメンバー管理画面.
 */
export const ProjectMembersPage = () => {
  const { projectId } = useParams();

  const { projectMembers, errorMessage, reloadProjectMembers } =
    useProjectMembers(projectId);

  if (!projectId) {
    return <Text color="red.500">プロジェクトIDが取得できません.</Text>;
  }

  return (
    <Stack gap={6}>
      <Heading>メンバー管理</Heading>

      <ProjectMemberAddForm
        projectId={projectId}
        onAdded={async () => {
          await reloadProjectMembers;
        }}
      />

      {errorMessage && <Text color="red.500">{errorMessage}</Text>}

      <ProjectMemberList
        projectId={projectId}
        members={projectMembers}
        onDeleted={async () => {
          await reloadProjectMembers;
        }}
      />
    </Stack>
  );
};
