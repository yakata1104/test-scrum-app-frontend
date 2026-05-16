import { useState } from "react";

import type { TaskColumn } from "../types/taskColumn";

/**
 * タスク作成Dialogの表示状態を管理する.
 *
 * Returns:
 *   object:
 *     選択中カラム, Dialog表示状態, Dialogを開く処理, Dialogを閉じる処理.
 */
export const useTaskCreateDialog = () => {
  const [selectedColumn, setSelectedColumn] = useState<TaskColumn | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * タスク作成Dialogを開く.
   *
   * Args:
   *   column:
   *     タスク作成ボタンを押下したカラム.
   */
  const open = (column: TaskColumn): void => {
    setSelectedColumn(column);
    setIsOpen(true);
  };

  /**
   * タスク作成Dialogを閉じる.
   */
  const close = (): void => {
    setIsOpen(false);
    setSelectedColumn(null);
  };

  return {
    selectedColumn,
    isOpen,
    open,
    close,
  };
};
