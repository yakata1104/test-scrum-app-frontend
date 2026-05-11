export type Task = {
  id: string;
  column_id: string;
  title: string;
  description: string | null;
  position: number;
  created_by: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};
