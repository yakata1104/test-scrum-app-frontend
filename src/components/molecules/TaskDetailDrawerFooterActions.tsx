import { Button, Stack } from "@chakra-ui/react";

type Props = {
  isEditing: boolean;
  isLoading: boolean;
  onClickClose: () => void;
  onClickCancel: () => void;
  onClickSubmit: () => void;
};

/**
 * タスク詳細Drawerフッター操作を表示する.
 *
 * Args:
 *   isEditing:
 *     編集モードかどうか.
 *   isLoading:
 *     更新処理中かどうか.
 *   onClickClose:
 *     閉じるボタン押下時に実行する処理.
 *   onClickCancel:
 *     キャンセルボタン押下時に実行する処理.
 *   onClickSubmit:
 *     決定ボタン押下時に実行する処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスク詳細Drawerフッター操作.
 */
export const TaskDetailDrawerFooterActions = ({
  isEditing,
  isLoading,
  onClickClose,
  onClickCancel,
  onClickSubmit,
}: Props) => {
  if (!isEditing) {
    return (
      <Button variant="outline" onClick={onClickClose}>
        閉じる
      </Button>
    );
  }

  return (
    <Stack direction="row" gap={2}>
      <Button colorPalette="green" loading={isLoading} onClick={onClickSubmit}>
        決定
      </Button>

      <Button variant="outline" onClick={onClickCancel}>
        キャンセル
      </Button>
    </Stack>
  );
};
