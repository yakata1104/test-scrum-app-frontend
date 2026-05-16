import type { TaskComment } from "../../types/taskComment";
import { TaskCommentTimeline } from "./TaskCommentTimeline";

type Props = {
  taskId: string;
  comments: TaskComment[];
  onReloadComments: () => Promise<void>;
};

/**
 * タスクコメントセクションを表示する.
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
 *     タスクコメントセクション.
 */
export const TaskCommentsSection = ({
  taskId,
  comments,
  onReloadComments,
}: Props) => {
  return (
    <TaskCommentTimeline
      taskId={taskId}
      comments={comments}
      onReloadComments={onReloadComments}
    />
  );
};
