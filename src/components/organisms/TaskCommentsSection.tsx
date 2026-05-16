import { useTaskComments } from "@/hooks/useTaskComments";
import { TaskCommentTimeline } from "./TaskCommentTimeline";

type Props = {
  taskId: string;
};

/**
 * タスクコメントセクションを表示する.
 *
 * Args:
 *   taskId:
 *     タスクID.
 *
 * Returns:
 *   JSX.Element:
 *     タスクコメントセクション.
 */
export const TaskCommentsSection = ({ taskId }: Props) => {
  const { taskComments, reloadComments } = useTaskComments(taskId);

  return (
    <TaskCommentTimeline
      taskId={taskId}
      comments={taskComments}
      onReloadComments={async () => {
        await reloadComments();
      }}
    />
  );
};
