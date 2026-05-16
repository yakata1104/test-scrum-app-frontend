import { Button, Dialog, Portal } from "@chakra-ui/react";
import { ProjectCreateForm } from "../molecules/ProjectCreateForm";

type Props = {
  open: boolean;
  onCreated: () => Promise<void>;
  onClose: () => void;
};

/**
 * プロジェクト作成Dialogを表示する.
 *
 * Args:
 *   open:
 *     Dialogの表示状態.
 *   onCreated:
 *     プロジェクト作成後に実行する処理.
 *   onClose:
 *     Dialogを閉じる処理.
 *
 * Returns:
 *   JSX.Element:
 *     プロジェクト作成Dialog.
 */
export const ProjectCreateDialog = ({ open, onCreated, onClose }: Props) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(event) => {
        if (!event.open) {
          onClose();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>プロジェクト作成</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <ProjectCreateForm onCreated={onCreated} onClose={onClose} />
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">閉じる</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
