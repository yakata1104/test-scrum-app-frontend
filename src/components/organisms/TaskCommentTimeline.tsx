import {
  Avatar,
  Box,
  IconButton,
  Menu,
  Portal,
  Stack,
  Text,
  Timeline,
} from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "../ui/toaster";

import { deleteTaskComment } from "../../services/taskCommentService";
import type { TaskComment } from "../../types/taskComment";
import { CommentDeleteConfirmDialog } from "../molecules/CommentDeleteConfirmDialog";
import { TaskCommentForm } from "../molecules/TaskCommentForm";

type Props = {
  taskId: string;
  comments: TaskComment[];
  onReloadComments: () => Promise<void>;
};

/**
 * タスクコメントTimelineを表示する.
 *
 * Args:
 *   taskId:
 *     タスクID.
 *   comments:
 *     タスクコメント一覧.
 *   onReloadComments:
 *     コメント一覧を再読み込みする処理.
 *
 * Returns:
 *   JSX.Element:
 *     タスクコメントTimeline.
 */
export const TaskCommentTimeline = ({
  taskId,
  comments,
  onReloadComments,
}: Props) => {
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * コメント削除確認Dialogを開く.
   *
   * Args:
   *   commentId:
   *     削除対象のコメントID.
   *
   * Returns:
   *   void:
   *     戻り値はありません.
   */
  const openDeleteConfirmDialog = (commentId: string): void => {
    setSelectedCommentId(commentId);
    setIsDeleteConfirmOpen(true);
  };

  /**
   * コメント削除を実行する.
   *
   * Returns:
   *   Promise<void>:
   *     戻り値はありません.
   */
  const handleDeleteComment = async (): Promise<void> => {
    if (!selectedCommentId) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteTaskComment(taskId, selectedCommentId);
      await onReloadComments();

      toaster.create({
        title: "コメントを削除しました.",
        type: "success",
      });

      setIsDeleteConfirmOpen(false);
      setSelectedCommentId(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Stack gap={4} pt={6}>
        <Text fontWeight="bold">コメント</Text>

        <TaskCommentForm taskId={taskId} onCreated={onReloadComments} />

        {comments.length === 0 ? (
          <Text color="gray.500" fontSize="sm">
            コメントはありません.
          </Text>
        ) : (
          <Timeline.Root>
            {comments.map((comment) => (
              <Timeline.Item key={comment.id}>
                <Timeline.Connector>
                  <Timeline.Separator />
                  <Timeline.Indicator>
                    <Avatar.Root size="xs">
                      <Avatar.Fallback>
                        {comment.user_id.slice(0, 1).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar.Root>
                  </Timeline.Indicator>
                </Timeline.Connector>

                <Timeline.Content>
                  <Box display="flex" justifyContent="space-between" gap={2}>
                    <Timeline.Title>
                      {new Date(comment.created_at).toLocaleString()}
                    </Timeline.Title>

                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <IconButton
                          aria-label="コメント操作メニュー"
                          size="xs"
                          variant="ghost"
                        >
                          …
                        </IconButton>
                      </Menu.Trigger>

                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content>
                            <Menu.Item
                              value="delete"
                              color="red.500"
                              onClick={() =>
                                openDeleteConfirmDialog(comment.id)
                              }
                            >
                              削除
                            </Menu.Item>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </Box>

                  <Timeline.Description>
                    <Box whiteSpace="pre-wrap">{comment.content}</Box>
                  </Timeline.Description>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline.Root>
        )}
      </Stack>

      <CommentDeleteConfirmDialog
        open={isDeleteConfirmOpen}
        loading={isDeleting}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setSelectedCommentId(null);
        }}
        onConfirm={() => void handleDeleteComment()}
      />
    </>
  );
};
