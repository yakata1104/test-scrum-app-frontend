import { Heading, Text } from "@chakra-ui/react";

/**
 * プロジェクトメンバー管理画面を表示する.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクトメンバー管理画面.
 */
export const ProjectMembersPage = () => {
  return (
    <>
      <Heading mb={6}>メンバー管理</Heading>
      <Text color="gray.500">
        ここにメンバー一覧と追加フォームを表示します.
      </Text>
    </>
  );
};
