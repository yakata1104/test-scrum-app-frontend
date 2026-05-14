import { Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProjectMemberAddForm } from "../molecules/ProjectMemberAddForm";
import { ProjectMemberList } from "../organisms/ProjectMemberList";
import { fetchProjectMembers } from "../../services/projectMemberService";
import type { ProjectMember } from "../../types/projectMember";

/**
 * プロジェクトメンバー管理画面を表示する.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクトメンバー管理画面.
 */
export const ProjectMembersPage = () => {
  const { projectId } = useParams();

  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const loadMembers = async (): Promise<void> => {
    if (!projectId) {
      return;
    }

    try {
      const fetchedMembers = await fetchProjectMembers(projectId);
      setMembers(fetchedMembers);
      setErrorMessage("");
    } catch {
      setErrorMessage("メンバー一覧の取得に失敗しました.");
    }
  };

  useEffect(() => {
    let isMounted = true;

    /**
     * 初期表示用にプロジェクトメンバー一覧を読み込む.
     */
    const loadInitialMembers = async (): Promise<void> => {
      if (!projectId) {
        return;
      }

      try {
        const fetchedMembers = await fetchProjectMembers(projectId);

        if (isMounted) {
          setMembers(fetchedMembers);
          setErrorMessage("");
        }
      } catch {
        if (isMounted) {
          setErrorMessage("メンバー一覧の取得に失敗しました.");
        }
      }
    };

    void loadInitialMembers();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  if (!projectId) {
    return <Text color="red.500">プロジェクトIDが取得できません.</Text>;
  }

  return (
    <Stack gap={6}>
      <Heading>メンバー管理</Heading>

      <ProjectMemberAddForm projectId={projectId} onAdded={loadMembers} />

      {errorMessage && <Text color="red.500">{errorMessage}</Text>}

      <ProjectMemberList
        projectId={projectId}
        members={members}
        onDeleted={loadMembers}
      />
    </Stack>
  );
};
