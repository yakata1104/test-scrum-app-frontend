import { toaster } from "@/components/ui/toaster";

import { moveTaskColumn } from "../services/taskService";

/**
 * タスクのカラム移動処理を管理する.
 *
 * Args:
 *   onMoved:
 *     タスク移動後に実行する処理.
 *
 * Returns:
 *   object:
 *     タスク移動処理.
 */
export const useMoveTaskColumn = (onMoved: () => Promise<void>) => {
  const move = async (taskId: string, columnId: string): Promise<void> => {
    try {
      await moveTaskColumn({
        taskId,
        columnId,
      });

      await onMoved();
    } catch {
      toaster.create({
        title: "タスクの移動に失敗しました.",
        type: "error",
      });
    }
  };

  return {
    move,
  };
};
