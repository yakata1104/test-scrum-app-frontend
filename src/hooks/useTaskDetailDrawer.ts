import { useState } from "react";

import type { Task } from "../types/task";

/**
 * タスク詳細Drawerの表示状態を管理する.
 *
 * Returns:
 *   object:
 *     選択中タスク, Drawer表示状態, Drawerを開く処理, Drawerを閉じる処理.
 */
export const useTaskDetailDrawer = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * タスク詳細Drawerを開く.
   *
   * Args:
   *   task:
   *     表示対象のタスク.
   */
  const open = (task: Task): void => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  /**
   * タスク詳細Drawerを閉じる.
   */
  const close = (): void => {
    setIsOpen(false);
    setSelectedTask(null);
  };

  return {
    selectedTask,
    isOpen,
    open,
    close,
  };
};
