import { Avatar, Box, Heading, Stack, Text, Timeline } from "@chakra-ui/react";

import type { TaskComment } from "../../types/taskComment";
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
  return (
    <Stack gap={4} pt={6}>
      <Heading size="sm">コメント</Heading>

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
                <Timeline.Title>
                  {new Date(comment.created_at).toLocaleString()}
                </Timeline.Title>

                <Timeline.Description>
                  <Box whiteSpace="pre-wrap">{comment.content}</Box>
                </Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline.Root>
      )}
    </Stack>
  );
};
